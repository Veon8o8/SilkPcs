// DataSelectModal.tsx
import React, { useState } from 'react';
import { Modal, Input, Table, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 数据类型定义
interface ProductDataType {
    key: string;
    productCode: string;
    productName: string;
    specification: string;
    unitWeight: number;
    productCategory: string;
    unit: string;
    productAttribute: string;
    productImage: string;
    defaultWarehouse: string;
    supplier: string;
}

interface DataSelectModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (selectedData: ProductDataType[]) => void;
}

const DataSelectModal: React.FC<DataSelectModalProps> = ({ visible, onCancel, onConfirm }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<ProductDataType[]>([]);

    // 模拟数据 - 实际使用时从API获取
    const [dataSource, setDataSource] = useState<ProductDataType[]>([
        {
            key: '1',
            productCode: 'CP0174',
            productName: '产品A',
            specification: '绞',
            unitWeight: 0,
            productCategory: '其他',
            unit: '个',
            productAttribute: '计划成品',
            productImage: '',
            defaultWarehouse: '成品仓库',
            supplier: '供应商A'
        },
        {
            key: '2',
            productCode: 'CP0173',
            productName: '产品B',
            specification: '筒',
            unitWeight: 0,
            productCategory: '其他',
            unit: '个',
            productAttribute: '计划成品',
            productImage: '',
            defaultWarehouse: '成品仓库',
            supplier: '供应商B'
        },
    ]);

    // 表格列定义 - 不再需要单独的选择列
    const columns: ColumnsType<ProductDataType> = [
        {
            title: '产品编码',
            dataIndex: 'productCode',
            key: 'productCode',
            width: 120
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
            width: 150
        },
        {
            title: '规格型号(绞长/筒...)',
            dataIndex: 'specification',
            key: 'specification',
            width: 150
        },
        {
            title: '单重(kg)',
            dataIndex: 'unitWeight',
            key: 'unitWeight',
            width: 100,
            render: (value: number) => value || '-'
        },
        {
            title: '产品类别',
            dataIndex: 'productCategory',
            key: 'productCategory',
            width: 100
        },
        {
            title: '单位',
            dataIndex: 'unit',
            key: 'unit',
            width: 80
        },
        {
            title: '产品属性',
            dataIndex: 'productAttribute',
            key: 'productAttribute',
            width: 100,
            render: (value: string) => <Tag color="blue">{value}</Tag>
        },
        {
            title: '产品图片',
            dataIndex: 'productImage',
            key: 'productImage',
            width: 100,
            render: (value: string) => value || '暂无图片'
        },
        {
            title: '默认仓库',
            dataIndex: 'defaultWarehouse',
            key: 'defaultWarehouse',
            width: 120
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
            width: 120
        }
    ];

    // 筛选数据
    const filteredData = dataSource.filter(item =>
        searchText === '' ||
        item.productCode.includes(searchText) ||
        item.productName.includes(searchText) ||
        item.supplier?.includes(searchText)
    );

    // 行选择配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[], newSelectedRows: ProductDataType[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedRows(newSelectedRows);
        },
        selections: true, // 显示全选/反选等选项
    };

    const handleConfirm = () => {
        onConfirm(selectedRows);
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setSearchText('');
    };

    const handleCancel = () => {
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setSearchText('');
        onCancel();
    };

    return (
        <Modal
            title="选择数据"
            open={visible}
            onCancel={handleCancel}
            onOk={handleConfirm}
            width="90%"
            style={{ top: 20 }}
            okButtonProps={{ disabled: selectedRowKeys.length === 0 }}
        >
            <div style={{ marginBottom: 16 }}>
                <Space>
                    <Input
                        placeholder="搜索数据"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Button>筛选</Button>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="key"
                pagination={{
                    pageSize: 100,
                    showSizeChanger: true,
                    showTotal: (total) => `共${total}条`,
                    pageSizeOptions: ['10', '20', '50', '100']
                }}
                scroll={{ x: 'max-content' }}
                rowSelection={rowSelection}
            />
        </Modal>
    );
};

export default DataSelectModal;