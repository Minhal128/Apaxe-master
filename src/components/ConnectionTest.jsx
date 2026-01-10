import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboardApi, clientApi, authApi } from '@/lib/api';

export default function ConnectionTest() {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const results = {};

    // Test 1: Health check
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/health`);
      const data = await response.json();
      results.health = { success: true, data };
    } catch (error) {
      results.health = { success: false, error: error.message };
    }

    // Test 2: Login test
    try {
      const response = await authApi.login({
        email: 'admin@apextrade.com',
        password: 'admin123456'
      });
      results.login = { success: true, data: 'Login successful' };

      // Store token for subsequent tests
      if (response.data?.data?.accessToken) {
        localStorage.setItem('master_token', response.data.data.accessToken);
      }
    } catch (error) {
      results.login = { success: false, error: error.response?.data?.message || error.message };
    }

    // Test 3: Dashboard API
    try {
      const response = await dashboardApi.getDashboard();
      results.dashboard = { success: true, data: response.data.data };
    } catch (error) {
      results.dashboard = { success: false, error: error.response?.data?.message || error.message };
    }

    // Test 4: Clients API
    try {
      const response = await clientApi.getClients();
      results.clients = { success: true, data: response.data.data };
    } catch (error) {
      results.clients = { success: false, error: error.response?.data?.message || error.message };
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const TestResult = ({ title, result }) => (
    <div className="mb-4 p-3 border rounded">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">{title}</span>
        <span className={`px-2 py-1 rounded text-xs ${result?.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
          {result?.success ? 'PASS' : 'FAIL'}
        </span>
      </div>
      {result?.success ? (
        <div className="text-sm text-gray-600">
          {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
        </div>
      ) : (
        <div className="text-sm text-red-600">
          Error: {result?.error || 'Unknown error'}
        </div>
      )}
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Master Backend Connection Test</h2>
          <Button
            onClick={runTests}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600"
          >
            {isLoading ? 'Testing...' : 'Run Tests'}
          </Button>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div>
            <TestResult title="1. Health Check" result={testResults.health} />
            <TestResult title="2. Master Login" result={testResults.login} />
            <TestResult title="3. Dashboard API" result={testResults.dashboard} />
            <TestResult title="4. Clients API" result={testResults.clients} />
          </div>
        )}

        {Object.keys(testResults).length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-8">
            Click "Run Tests" to test the connection to the master backend
          </div>
        )}
      </CardContent>
    </Card>
  );
}