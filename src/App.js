import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Home, 
  Car, 
  ShoppingCart, 
  PiggyBank, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Trash2, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Coffee,
  Smartphone,
  Shield,
  Utensils,
  Heart,
  Target,
  TrendingDown
} from 'lucide-react';

function App() {
  // Current month for auto-fill
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Income state
  const [income, setIncome] = useState({
    salary: 1750,
    other: 0
  });

  // Fixed expenses state (hardcoded budgets as per requirements)
  const [fixedExpenses, setFixedExpenses] = useState({
    rent: { budget: 308, actual: 0, notes: '' },
    utilities: { budget: 50, actual: 0, notes: '' },
    phone: { budget: 25, actual: 0, notes: '' },
    insurance: { budget: 60, actual: 0, notes: '' }
  });

  // Variable expenses state
  const [variableExpenses, setVariableExpenses] = useState({
    groceries: { budget: 300, actual: 0, notes: '' },
    transportation: { budget: 80, actual: 0, notes: '' },
    entertainment: { budget: 150, actual: 0, notes: '' },
    dining: { budget: 100, actual: 0, notes: '' },
    personal: { budget: 22, actual: 0, notes: '' }
  });

  // Savings state
  const [savings, setSavings] = useState({
    emergency: { budget: 150, actual: 0, notes: '' },
    longterm: { budget: 100, actual: 0, notes: '' },
    investments: { budget: 100, actual: 0, notes: '' }
  });

  // Calculate totals
  const totalIncome = income.salary + income.other;
  const totalFixedBudget = Object.values(fixedExpenses).reduce((sum, item) => sum + item.budget, 0);
  const totalFixedActual = Object.values(fixedExpenses).reduce((sum, item) => sum + item.actual, 0);
  const totalVariableBudget = Object.values(variableExpenses).reduce((sum, item) => sum + item.budget, 0);
  const totalVariableActual = Object.values(variableExpenses).reduce((sum, item) => sum + item.actual, 0);
  const totalSavingsBudget = Object.values(savings).reduce((sum, item) => sum + item.budget, 0);
  const totalSavingsActual = Object.values(savings).reduce((sum, item) => sum + item.actual, 0);
  const totalExpenses = totalFixedActual + totalVariableActual;
  const netIncome = totalIncome - totalExpenses - totalSavingsActual;
  const savingsRate = totalIncome > 0 ? ((totalSavingsActual / totalIncome) * 100) : 0;

  // Helper functions
  const formatCurrency = (amount) => {
    return privacyMode ? '€***' : `€${amount.toFixed(0)}`;
  };

  const getProgressColor = (actual, budget) => {
    const percentage = (actual / budget) * 100;
    if (percentage <= 105) return 'progress-green';
    if (percentage <= 115) return 'progress-yellow';
    return 'progress-red';
  };

  const getProgressPercentage = (actual, budget) => {
    return Math.min((actual / budget) * 100, 100);
  };

  const getStatusIcon = (actual, budget) => {
    const percentage = (actual / budget) * 100;
    if (percentage <= 105) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (percentage <= 115) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  // Export functionality
  const exportData = () => {
    const data = {
      month: currentMonth,
      income,
      fixedExpenses,
      variableExpenses,
      savings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cashflow-${currentMonth}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import functionality
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.month) setCurrentMonth(data.month);
        if (data.income) setIncome(data.income);
        if (data.fixedExpenses) setFixedExpenses(data.fixedExpenses);
        if (data.variableExpenses) setVariableExpenses(data.variableExpenses);
        if (data.savings) setSavings(data.savings);
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Clear all data
  const clearAllData = () => {
    setIncome({ salary: 1750, other: 0 });
    setFixedExpenses({
      rent: { budget: 308, actual: 0, notes: '' },
      utilities: { budget: 50, actual: 0, notes: '' },
      phone: { budget: 25, actual: 0, notes: '' },
      insurance: { budget: 60, actual: 0, notes: '' }
    });
    setVariableExpenses({
      groceries: { budget: 300, actual: 0, notes: '' },
      transportation: { budget: 80, actual: 0, notes: '' },
      entertainment: { budget: 150, actual: 0, notes: '' },
      dining: { budget: 100, actual: 0, notes: '' },
      personal: { budget: 22, actual: 0, notes: '' }
    });
    setSavings({
      emergency: { budget: 150, actual: 0, notes: '' },
      longterm: { budget: 100, actual: 0, notes: '' },
      investments: { budget: 100, actual: 0, notes: '' }
    });
    setShowClearConfirm(false);
    alert('All data cleared successfully!');
  };

  // Expense Item Component
  const ExpenseItem = ({ name, item, onUpdate, icon: Icon, category }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-800">{name}</h3>
          {getStatusIcon(item.actual, item.budget)}
        </div>
        <span className="text-sm text-gray-500">Budget: {formatCurrency(item.budget)}</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Actual Amount</label>
          <input
            type="number"
            value={item.actual}
            onChange={(e) => onUpdate({ ...item, actual: parseFloat(e.target.value) || 0 })}
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressColor(item.actual, item.budget)}`}
            style={{ width: `${getProgressPercentage(item.actual, item.budget)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {formatCurrency(item.actual)} / {formatCurrency(item.budget)}
          </span>
          <span className={`font-medium ${item.actual > item.budget ? 'text-red-600' : 'text-green-600'}`}>
            {item.actual > item.budget ? '+' : ''}{formatCurrency(item.actual - item.budget)}
          </span>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={item.notes}
            onChange={(e) => onUpdate({ ...item, notes: e.target.value })}
            className="input-field resize-none"
            rows="2"
            placeholder="Add notes..."
          />
        </div>
      </div>
    </div>
  );

  // Tab content components
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Income</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(totalIncome)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="stat-card bg-red-50 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Expenses</p>
              <p className="text-2xl font-bold text-red-700">{formatCurrency(totalExpenses)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="stat-card bg-purple-50 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Savings</p>
              <p className="text-2xl font-bold text-purple-700">{formatCurrency(totalSavingsActual)}</p>
            </div>
            <PiggyBank className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="stat-card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Savings Rate</p>
              <p className="text-2xl font-bold text-blue-700">{savingsRate.toFixed(1)}%</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Income Section */}
      <div className="card bg-green-50">
        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
          <DollarSign className="w-6 h-6 mr-2" />
          Income
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="number"
              value={income.salary}
              onChange={(e) => setIncome({ ...income, salary: parseFloat(e.target.value) || 0 })}
              className="input-field"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Income</label>
            <input
              type="number"
              value={income.other}
              onChange={(e) => setIncome({ ...income, other: parseFloat(e.target.value) || 0 })}
              className="input-field"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Net Income */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Financial Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Income:</span>
            <span className="font-medium">{formatCurrency(totalIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Expenses:</span>
            <span className="font-medium">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Savings:</span>
            <span className="font-medium">{formatCurrency(totalSavingsActual)}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <span className="font-medium">Net Income:</span>
            <span className={`font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netIncome)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const FixedTab = () => (
    <div className="space-y-4">
      <div className="card bg-blue-50">
        <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center">
          <Home className="w-6 h-6 mr-2" />
          Fixed Expenses
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Budget: {formatCurrency(totalFixedBudget)} | Actual: {formatCurrency(totalFixedActual)} | 
          Difference: <span className={totalFixedActual > totalFixedBudget ? 'text-red-600' : 'text-green-600'}>
            {formatCurrency(totalFixedActual - totalFixedBudget)}
          </span>
        </p>
      </div>
      
      <ExpenseItem
        name="Rent + Internet"
        item={fixedExpenses.rent}
        onUpdate={(updated) => setFixedExpenses({ ...fixedExpenses, rent: updated })}
        icon={Home}
        category="fixed"
      />
      <ExpenseItem
        name="Gas + Power"
        item={fixedExpenses.utilities}
        onUpdate={(updated) => setFixedExpenses({ ...fixedExpenses, utilities: updated })}
        icon={FileText}
        category="fixed"
      />
      <ExpenseItem
        name="Phone"
        item={fixedExpenses.phone}
        onUpdate={(updated) => setFixedExpenses({ ...fixedExpenses, phone: updated })}
        icon={Smartphone}
        category="fixed"
      />
      <ExpenseItem
        name="Insurance"
        item={fixedExpenses.insurance}
        onUpdate={(updated) => setFixedExpenses({ ...fixedExpenses, insurance: updated })}
        icon={Shield}
        category="fixed"
      />
    </div>
  );

  const VariableTab = () => (
    <div className="space-y-4">
      <div className="card bg-orange-50">
        <h2 className="text-xl font-bold text-orange-700 mb-2 flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2" />
          Variable Expenses
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Budget: {formatCurrency(totalVariableBudget)} | Actual: {formatCurrency(totalVariableActual)} | 
          Difference: <span className={totalVariableActual > totalVariableBudget ? 'text-red-600' : 'text-green-600'}>
            {formatCurrency(totalVariableActual - totalVariableBudget)}
          </span>
        </p>
      </div>
      
      <ExpenseItem
        name="Groceries"
        item={variableExpenses.groceries}
        onUpdate={(updated) => setVariableExpenses({ ...variableExpenses, groceries: updated })}
        icon={ShoppingCart}
        category="variable"
      />
      <ExpenseItem
        name="Transportation"
        item={variableExpenses.transportation}
        onUpdate={(updated) => setVariableExpenses({ ...variableExpenses, transportation: updated })}
        icon={Car}
        category="variable"
      />
      <ExpenseItem
        name="Entertainment"
        item={variableExpenses.entertainment}
        onUpdate={(updated) => setVariableExpenses({ ...variableExpenses, entertainment: updated })}
        icon={Coffee}
        category="variable"
      />
      <ExpenseItem
        name="Dining Out"
        item={variableExpenses.dining}
        onUpdate={(updated) => setVariableExpenses({ ...variableExpenses, dining: updated })}
        icon={Utensils}
        category="variable"
      />
      <ExpenseItem
        name="Personal Care"
        item={variableExpenses.personal}
        onUpdate={(updated) => setVariableExpenses({ ...variableExpenses, personal: updated })}
        icon={Heart}
        category="variable"
      />
    </div>
  );

  const SavingsTab = () => (
    <div className="space-y-4">
      <div className="card bg-purple-50">
        <h2 className="text-xl font-bold text-purple-700 mb-2 flex items-center">
          <PiggyBank className="w-6 h-6 mr-2" />
          Savings Goals
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Target: {formatCurrency(totalSavingsBudget)} | Actual: {formatCurrency(totalSavingsActual)} | 
          Rate: <span className="font-medium text-purple-600">{savingsRate.toFixed(1)}%</span>
        </p>
      </div>
      
      <ExpenseItem
        name="Emergency Fund"
        item={savings.emergency}
        onUpdate={(updated) => setSavings({ ...savings, emergency: updated })}
        icon={Shield}
        category="savings"
      />
      <ExpenseItem
        name="Long-term Savings"
        item={savings.longterm}
        onUpdate={(updated) => setSavings({ ...savings, longterm: updated })}
        icon={PiggyBank}
        category="savings"
      />
      <ExpenseItem
        name="Investments"
        item={savings.investments}
        onUpdate={(updated) => setSavings({ ...savings, investments: updated })}
        icon={TrendingUp}
        category="savings"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-header text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Cash Flow Tracker</h1>
                <p className="text-blue-100 text-sm">
                  {new Date(currentMonth + '-01').toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="month"
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
                className="px-3 py-1 rounded bg-white/20 text-white placeholder-white/70 border border-white/30 touch-friendly"
              />
              <button
                onClick={() => setPrivacyMode(!privacyMode)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors touch-friendly"
                title="Toggle privacy mode"
              >
                {privacyMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Tab Navigation */}
        <div className="bg-gray-100 rounded-lg p-1 mb-6 flex overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'fixed', label: 'Fixed', icon: Home },
            { id: 'variable', label: 'Variable', icon: ShoppingCart },
            { id: 'savings', label: 'Savings', icon: PiggyBank }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`tab-button ${activeTab === id ? 'tab-active' : 'tab-inactive'}`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'fixed' && <FixedTab />}
        {activeTab === 'variable' && <VariableTab />}
        {activeTab === 'savings' && <SavingsTab />}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <button onClick={exportData} className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          
          <label className="btn-secondary flex items-center space-x-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          
          <button 
            onClick={() => setShowClearConfirm(true)}
            className="btn-danger flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Clear All Data?</h3>
              <p className="text-gray-600 mb-6">This will reset all expenses and income to zero. This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button onClick={clearAllData} className="btn-danger flex-1">
                  Yes, Clear All
                </button>
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-12 pb-8">
          <div className="card bg-blue-50">
            <h3 className="font-medium text-gray-700 mb-2">💡 Quick Tips</h3>
            <div className="space-y-1 text-xs">
              <p>• Track expenses daily for better accuracy</p>
              <p>• Aim for a savings rate of 20% or higher</p>
              <p>• Review and adjust budgets monthly</p>
              <p>• Use notes to remember what drove higher expenses</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
