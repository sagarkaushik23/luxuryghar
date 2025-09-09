import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Generic CRUD hook
export function useSupabase<T extends keyof Tables>(
  tableName: T,
  options?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(tableName).select(options?.select || '*');

      // Apply filters
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }

      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error } = await query;

      if (error) throw error;
      setData(result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Create record
  const create = async (record: Tables[T]['Insert']) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(record)
        .select()
        .single();

      if (error) throw error;
      
      setData(prev => [...prev, result]);
      return { data: result, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Create failed';
      return { data: null, error: errorMessage };
    }
  };

  // Update record
  const update = async (id: string, updates: Tables[T]['Update']) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setData(prev => prev.map(item => 
        item.id === id ? result : item
      ));
      return { data: result, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed';
      return { data: null, error: errorMessage };
    }
  };

  // Delete record
  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setData(prev => prev.filter(item => item.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName, JSON.stringify(options)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update,
    remove
  };
}

// Specific hooks for common operations
export function useProjects(filters?: { city?: string; company_id?: string; is_featured?: boolean }) {
  return useSupabase('projects', {
    filter: filters,
    orderBy: { column: 'created_at', ascending: false }
  });
}

export function useCompanies() {
  return useSupabase('companies', {
    orderBy: { column: 'name', ascending: true }
  });
}

export function useInquiries(userId?: string) {
  return useSupabase('inquiries', {
    filter: userId ? { user_id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false }
  });
}

export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<Tables['user_profiles']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Tables['user_profiles']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed';
      return { data: null, error: errorMessage };
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
}