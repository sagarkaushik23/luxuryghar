import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Building2, 
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const businessMetrics = [
    {
      label: 'Total Revenue',
      value: '₹2.4Cr',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
      description: 'Commission from successful deals'
    },
    {
      label: 'Active Users',
      value: '1,432',
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Monthly active users'
    },
    {
      label: 'Project Inquiries',
      value: '3,247',
      change: '+22.5%',
      trend: 'up',
      icon: Eye,
      color: 'bg-purple-500',
      description: 'Total inquiries this month'
    },
    {
      label: 'Conversion Rate',
      value: '4.8%',
      change: '-1.2%',
      trend: 'down',
      icon: Target,
      color: 'bg-amber-500',
      description: 'Inquiry to purchase conversion'
    }
  ];

  const topPerformingProjects = [
    {
      name: 'Sobha Royal Pavilion',
      builder: 'Sobha Limited',
      inquiries: 245,
      conversions: 12,
      revenue: '₹30L',
      conversionRate: 4.9
    },
    {
      name: 'Godrej Aqua',
      builder: 'Godrej Properties',
      inquiries: 189,
      conversions: 8,
      revenue: '₹20L',
      conversionRate: 4.2
    },
    {
      name: 'DLF Camellias',
      builder: 'DLF Limited',
      inquiries: 156,
      conversions: 6,
      revenue: '₹45L',
      conversionRate: 3.8
    }
  ];

  const userSegments = [
    {
      segment: 'VIP Users',
      count: 89,
      percentage: 6.2,
      avgInvestment: '₹5.2Cr',
      color: 'bg-amber-500'
    },
    {
      segment: 'Premium Users',
      count: 234,
      percentage: 16.3,
      avgInvestment: '₹2.1Cr',
      color: 'bg-purple-500'
    },
    {
      segment: 'Regular Users',
      count: 1109,
      percentage: 77.5,
      avgInvestment: '₹85L',
      color: 'bg-blue-500'
    }
  ];

  const monthlyTrends = [
    { month: 'Jan', revenue: 18, inquiries: 2100, conversions: 95 },
    { month: 'Feb', revenue: 22, inquiries: 2400, conversions: 108 },
    { month: 'Mar', revenue: 19, inquiries: 2200, conversions: 89 },
    { month: 'Apr', revenue: 25, inquiries: 2800, conversions: 125 },
    { month: 'May', revenue: 28, inquiries: 3100, conversions: 142 },
    { month: 'Jun', revenue: 24, inquiries: 2900, conversions: 118 }
  ];

  const builderPerformance = [
    {
      name: 'Sobha Limited',
      projects: 12,
      totalInquiries: 1245,
      conversions: 58,
      revenue: '₹1.2Cr',
      rating: 4.8
    },
    {
      name: 'Godrej Properties',
      projects: 8,
      totalInquiries: 892,
      conversions: 34,
      revenue: '₹68L',
      rating: 4.6
    },
    {
      name: 'DLF Limited',
      projects: 6,
      totalInquiries: 567,
      conversions: 28,
      revenue: '₹95L',
      rating: 4.4
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Analytics & Reports</h1>
          <p className="text-slate-600 mt-1">Track business performance and growth metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessMetrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</p>
              <p className="text-sm font-medium text-slate-700 mb-1">{metric.label}</p>
              <p className="text-xs text-slate-500">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Monthly Trends</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-slate-600">Revenue (₹L)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Inquiries</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {monthlyTrends.map((trend, index) => (
              <div key={trend.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-slate-700 w-8">{trend.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(trend.revenue / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600">₹{trend.revenue}L</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">{trend.inquiries}</span>
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(trend.inquiries / 3500) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Segments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">User Segments</h2>
          <div className="space-y-4">
            {userSegments.map((segment) => (
              <div key={segment.segment} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                    <h3 className="font-semibold text-slate-800">{segment.segment}</h3>
                  </div>
                  <span className="text-sm text-slate-500">{segment.percentage}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Users</p>
                    <p className="font-medium text-slate-800">{segment.count}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Avg Investment</p>
                    <p className="font-medium text-slate-800">{segment.avgInvestment}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`${segment.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Projects */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Top Performing Projects</h2>
          <div className="space-y-4">
            {topPerformingProjects.map((project, index) => (
              <div key={project.name} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-800">{project.name}</h3>
                    <p className="text-sm text-slate-500">{project.builder}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{project.revenue}</p>
                    <p className="text-xs text-slate-500">Revenue</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-slate-800">{project.inquiries}</p>
                    <p className="text-slate-600">Inquiries</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-800">{project.conversions}</p>
                    <p className="text-slate-600">Conversions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-800">{project.conversionRate}%</p>
                    <p className="text-slate-600">Rate</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Builder Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Builder Performance</h2>
          <div className="space-y-4">
            {builderPerformance.map((builder, index) => (
              <div key={builder.name} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{builder.name}</h3>
                    <p className="text-sm text-slate-500">{builder.projects} projects</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-amber-500">★</span>
                    <span className="text-sm font-medium text-slate-700">{builder.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div className="text-center">
                    <p className="font-medium text-slate-800">{builder.totalInquiries}</p>
                    <p className="text-slate-600">Inquiries</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-800">{builder.conversions}</p>
                    <p className="text-slate-600">Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600">{builder.revenue}</p>
                    <p className="text-slate-600">Revenue</p>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-slate-800 to-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(builder.conversions / builder.totalInquiries) * 100 * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Growth Insights */}
      <div className="bg-gradient-to-r from-slate-800 to-amber-500 rounded-2xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Business Growth Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-6 h-6 text-amber-300" />
              <h3 className="font-semibold">Revenue Growth</h3>
            </div>
            <p className="text-2xl font-bold mb-2">+15.2%</p>
            <p className="text-sm text-slate-200">Month-over-month growth in commission revenue</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-amber-300" />
              <h3 className="font-semibold">User Acquisition</h3>
            </div>
            <p className="text-2xl font-bold mb-2">+127</p>
            <p className="text-sm text-slate-200">New premium users this month</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="w-6 h-6 text-amber-300" />
              <h3 className="font-semibold">Market Share</h3>
            </div>
            <p className="text-2xl font-bold mb-2">12.4%</p>
            <p className="text-sm text-slate-200">Of luxury real estate inquiries in target cities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;