
export interface StockItem {
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'high' | 'medium' | 'low' | 'out';
  category: string;
}

export interface TrendingItem {
  name: string;
  demand: number;
  growth: number;
  category: string;
}

export interface SalesData {
  date: string;
  sales: number;
  revenue: number;
  orders: number;
}

export interface Alert {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  message: string;
  product?: string;
  timestamp: Date;
}

export interface CustomerFeedback {
  product: string;
  rating: number;
  reviews: number;
  sentiment: number;
}

export function generateMockData() {
  const medicines = [
    'Aspirin', 'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Metformin',
    'Lisinopril', 'Atorvastatin', 'Amlodipine', 'Metoprolol', 'Omeprazole',
    'Losartan', 'Gabapentin', 'Hydrochlorothiazide', 'Sertraline', 'Montelukast'
  ];

  const categories = ['Antibiotics', 'Pain Relief', 'Cardiovascular', 'Diabetes', 'Mental Health'];

  const stockLevels: StockItem[] = medicines.map(medicine => {
    const currentStock = Math.floor(Math.random() * 1000) + 10;
    const minStock = Math.floor(Math.random() * 100) + 50;
    const maxStock = minStock + Math.floor(Math.random() * 500) + 200;
    
    let status: 'high' | 'medium' | 'low' | 'out';
    if (currentStock === 0) status = 'out';
    else if (currentStock < minStock) status = 'low';
    else if (currentStock < minStock * 2) status = 'medium';
    else status = 'high';

    return {
      name: medicine,
      currentStock,
      minStock,
      maxStock,
      status,
      category: categories[Math.floor(Math.random() * categories.length)]
    };
  });

  const trending: TrendingItem[] = medicines.slice(0, 8).map(medicine => ({
    name: medicine,
    demand: Math.floor(Math.random() * 100) + 20,
    growth: (Math.random() - 0.3) * 50,
    category: categories[Math.floor(Math.random() * categories.length)]
  }));

  const mostBought = medicines.slice(0, 6).map(medicine => ({
    name: medicine,
    value: Math.floor(Math.random() * 500) + 100,
    percentage: Math.floor(Math.random() * 25) + 5
  }));

  const slowestSelling = medicines.slice(-5).map(medicine => ({
    name: medicine,
    sales: Math.floor(Math.random() * 20) + 1,
    daysInStock: Math.floor(Math.random() * 100) + 30
  }));

  const salesTrends: SalesData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 5000) + 2000,
      revenue: Math.floor(Math.random() * 50000) + 20000,
      orders: Math.floor(Math.random() * 200) + 50
    };
  });

  const productTrends = medicines.slice(0, 5).map(medicine => ({
    name: medicine,
    data: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
      sales: Math.floor(Math.random() * 1000) + 200
    }))
  }));

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'urgent',
      message: 'Aspirin stock critically low (5 units remaining)',
      product: 'Aspirin',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning',
      message: 'High demand detected for Paracetamol',
      product: 'Paracetamol',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'info',
      message: 'Shipment of Amoxicillin expected tomorrow',
      product: 'Amoxicillin',
      timestamp: new Date()
    }
  ];

  const customerFeedback: CustomerFeedback[] = medicines.slice(0, 8).map(medicine => ({
    product: medicine,
    rating: Math.random() * 2 + 3, // 3-5 rating
    reviews: Math.floor(Math.random() * 500) + 50,
    sentiment: Math.random() * 0.4 + 0.6 // 0.6-1.0 sentiment
  }));

  return {
    stockLevels,
    trending,
    mostBought,
    slowestSelling,
    salesTrends,
    productTrends,
    alerts,
    customerFeedback,
    totalRevenue: salesTrends.reduce((sum, day) => sum + day.revenue, 0),
    totalProducts: medicines.length,
    lowStockCount: stockLevels.filter(item => item.status === 'low' || item.status === 'out').length,
    activeCustomers: Math.floor(Math.random() * 1000) + 500,
    replenishmentScore: Math.floor(Math.random() * 40) + 60
  };
}
