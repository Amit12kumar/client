import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Select, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { fetchAssetsRequest, updateAssetRequest } from '../actions';
import { AppState } from '../reducers/index';

const { Option } = Select;

interface AssetTableProps {
  data: any[];
  loading: boolean;
  error: string | null;
  fetchAssetsRequest: (symbol: string) => void;
  updateAssetRequest: (id: string, price: number) => void;
}

const AssetTable: React.FC<AssetTableProps> = (props) => {
  const { data, loading, error, fetchAssetsRequest, updateAssetRequest } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('bitcoin');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = () => {
      fetchAssetsRequest(selectedSymbol);
    };

    fetchData();
    // const intervalId = setInterval(fetchData, 5000);

    // return () => clearInterval(intervalId);
  }, [fetchAssetsRequest, selectedSymbol]);

  const columns = [
    {
      title: 'Serial No',
      dataIndex: 'serialNo',
      key: 'serialNo',
      render: (text: any, record: any, index: number) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: any, record: any, index: number) => text + '$'
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button onClick={() => showUpdateModal(record)}>Update</Button>
      ),
    },
  ];

  const showUpdateModal = (asset: any) => {
    setSelectedAsset(asset);
    setNewPrice(asset.price);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateOk = () => {
    if (selectedAsset && newPrice !== undefined) {
      updateAssetRequest(selectedAsset._id, newPrice);
      setIsUpdateModalVisible(false);
    }
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    fetchAssetsRequest(selectedSymbol);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value: string) => {
    setSelectedSymbol(value);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current: number, size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Crypto Tracker</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Change Asset
        </Button>
      </div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="_id" pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: data.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        onChange: onPageChange,
        onShowSizeChange: onShowSizeChange,
      }} />
      <Modal title="Select Asset" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Select defaultValue="bitcoin" style={{ width: '100%' }} onChange={handleChange}>
          <Option value="bitcoin">Bitcoin</Option>
          <Option value="ethereum">Ethereum</Option>
          <Option value="litecoin">Litecoin</Option>
          <Option value="ripple">Ripple</Option>
          <Option value="cardano">Cardano</Option>
        </Select>
      </Modal>
      <Modal title="Update Price" visible={isUpdateModalVisible} onOk={handleUpdateOk} onCancel={handleUpdateCancel}>
        <Form layout="vertical">
          <Form.Item label="Price">
            <Input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(parseFloat(e.target.value))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  data: state.assets.data,
  loading: state.assets.loading,
  error: state.assets.error,
});

const mapDispatchToProps = {
  fetchAssetsRequest,
  updateAssetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
