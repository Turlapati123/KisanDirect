import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  season: string;
  harvestDate: string;
  description: string;
  image: string | null;
  status: 'active' | 'inactive';
}

const FarmerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    activeProducts: 0,
    pendingOrders: 0,
    totalReviews: 0
  });

  useEffect(() => {
    // Load farmer's products and stats
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts.filter((p: Product) => p.status === 'active'));
    
    // Calculate stats
    setStats({
      totalSales: 45000, // Demo value
      activeProducts: storedProducts.length,
      pendingOrders: 5, // Demo value
      totalReviews: 128 // Demo value
    });
  }, []);

  const handleAddProduct = async (formData: FormData) => {
    const newProduct = {
      id: Date.now(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      quantity: Number(formData.get('quantity')),
      price: Number(formData.get('price')),
      season: formData.get('season') as string,
      harvestDate: formData.get('harvestDate') as string,
      description: formData.get('description') as string,
      image: null,
      status: 'active' as const
    };

    const file = formData.get('image') as File;
    if (file) {
      newProduct.image = URL.createObjectURL(file);
    }

    setProducts([...products, newProduct]);
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('farmer.dashboard.title')}
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t('farmer.dashboard.stats.totalSales')}
            </h3>
            <p className="text-3xl font-bold text-green-500">₹{stats.totalSales}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t('farmer.dashboard.stats.activeProducts')}
            </h3>
            <p className="text-3xl font-bold text-green-500">{stats.activeProducts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t('farmer.dashboard.stats.pendingOrders')}
            </h3>
            <p className="text-3xl font-bold text-green-500">{stats.pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t('farmer.dashboard.stats.totalReviews')}
            </h3>
            <p className="text-3xl font-bold text-green-500">{stats.totalReviews}</p>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {t('farmer.product.title')}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct(new FormData(e.currentTarget));
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.category')}
                </label>
                <select
                  name="category"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                >
                  {Object.entries(t('farmer.product.categories', { returnObjects: true })).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.quantity')}
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.price')}
                </label>
                <input
                  type="number"
                  name="price"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.season')}
                </label>
                <select
                  name="season"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                >
                  {Object.entries(t('farmer.product.seasons', { returnObjects: true })).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.harvestDate')}
                </label>
                <input
                  type="date"
                  name="harvestDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.description')}
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t('farmer.product.image')}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="mt-1 block w-full"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {t('farmer.product.addButton')}
              </button>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('farmer.product.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('farmer.product.category')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('farmer.product.quantity')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('farmer.product.price')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.active')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`farmer.product.categories.${product.category}`)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.price}/kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {t(`common.${product.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;