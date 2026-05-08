// src/page/pwo/components/ProductDetailTable.tsx

// 生产产品明细组件

import React, { useState } from 'react';
import { Card, Button, Table, Input, InputNumber, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import DataSelectModal from './DataSelectModal';

interface ProductDetailTableProps {
    productList: any[];
    onUpdateList: (newList: any[]) => void;
}

export const ProductDetailTable: React.FC<ProductDetailTableProps> = ({ productList, onUpdateList }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentRowKey, setCurrentRowKey] = useState<string | null>(null);

    const addProductRow = () => {
        const newKey = Date.now();
        onUpdateList([...productList, { key: newKey, selectData: '', productName: '', planWeight: 0, productCode: '', productionUnit: '', producedWeight: 0, pendingWeight: 0 }]);
    };

    const deleteProductRow = (key: string) => {
        onUpdateList(productList.filter(item => item.key !== key));
    };

    const updateCell = (key: string, field: string, value: any) => {
        onUpdateList(productList.map(item => item.key === key ? { ...item, [field]: value } : item));
    };

    // 打开弹框
    const openSelectModal = (recordKey: string) => {
        setCurrentRowKey(recordKey);
        setModalVisible(true);
    };

    // 确认选择数据（多选版本）
    const handleConfirmSelect = (selectedProducts: any[]) => {
        if (selectedProducts && selectedProducts.length > 0) {
            let newList = [...productList];
            
            if (currentRowKey) {
                // 找到当前行的索引
                const currentRowIndex = newList.findIndex(row => row.key === currentRowKey);
                
                if (currentRowIndex !== -1) {
                    // 替换当前行为第一个选中的产品
                    const firstProduct = selectedProducts[0];
                    newList[currentRowIndex] = {
                        ...newList[currentRowIndex],
                        selectData: `${firstProduct.productCode} - ${firstProduct.productName}`,
                        productName: firstProduct.productName,
                        productCode: firstProduct.productCode,
                        productionUnit: firstProduct.unit || '暂无内容',
                        planWeight: 0,
                        producedWeight: 0,
                        pendingWeight: 0,
                        selectedProduct: firstProduct
                    };
                    
                    // 如果有更多选中的产品，在当前位置后面插入新行
                    if (selectedProducts.length > 1) {
                        const additionalRows = selectedProducts.slice(1).map((product, index) => ({
                            key: Date.now() + index,
                            selectData: `${product.productCode} - ${product.productName}`,
                            productName: product.productName,
                            productCode: product.productCode,
                            productionUnit: product.unit || '暂无内容',
                            planWeight: 0,
                            producedWeight: 0,
                            pendingWeight: 0,
                            selectedProduct: product
                        }));
                        
                        // 在当前行后面插入所有新行
                        newList.splice(currentRowIndex + 1, 0, ...additionalRows);
                    }
                }
            } else {
                // 如果没有当前行（理论上不会发生），则在末尾添加所有选中的产品
                const newRows = selectedProducts.map((product, index) => ({
                    key: Date.now() + index,
                    selectData: `${product.productCode} - ${product.productName}`,
                    productName: product.productName,
                    productCode: product.productCode,
                    productionUnit: product.unit || '暂无内容',
                    planWeight: 0,
                    producedWeight: 0,
                    pendingWeight: 0,
                    selectedProduct: product
                }));
                newList = [...newList, ...newRows];
            }
            
            onUpdateList(newList);
        }
        setModalVisible(false);
        setCurrentRowKey(null);
    };

    // 取消选择
    const handleCancelSelect = () => {
        setModalVisible(false);
        setCurrentRowKey(null);
    };

    const productColumns = [
        {
            title: '序号', dataIndex: 'key',
            render: (_: any, __: any, index: number) =>
                index + 1,
            width: 60, fixed: 'left' as const
        },
        {
            title: '选择数据',
            dataIndex: 'selectData',
            render: (text: string, record: any) => (
                <Button
                    type="link"
                    onClick={() => openSelectModal(record.key)}
                    style={{ padding: 0 }}
                >
                    {text || '请选择'}
                </Button>
            ),
            width: 120,
            fixed: 'left' as const
        },
        {
            title: '产品名称(批号)', dataIndex: 'productName',
            render: (text: string) => (
                <span style={{ userSelect: text ? 'auto' : 'none' }}>
                    {text || '暂无内容'}
                </span>
            ),
            width: 160, fixed: 'left' as const
        },
        {
            title: '计划生产重量(吨)', dataIndex: 'planWeight',
            render: (value: number, record: any) =>
                <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" onChange={(val) => updateCell(record.key, 'planWeight', val)} />,
            width: 150
        },
        {
            title: '产品编码', dataIndex: 'productCode',
            render: (text: string) => (
                <span style={{ userSelect: text ? 'auto' : 'none' }}>
                    {text || '暂无内容'}
                </span>
            ),
            width: 130
        },
        {
            title: '生产单位', dataIndex: 'productionUnit',
            render: (text: string) => (
                <span style={{ userSelect: text ? 'auto' : 'none' }}>
                    {text || '暂无内容'}
                </span>
            ),
            width: 120
        },
        {
            title: '已生产数量(吨)', dataIndex: 'producedWeight',
            render: (value: number, record: any) =>
                <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" onChange={(val) => updateCell(record.key, 'producedWeight', val)} />,
            width: 150
        },
        {
            title: '待生产数量(吨)', dataIndex: 'pendingWeight',
            render: (value: number, record: any) =>
                <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" onChange={(val) => updateCell(record.key, 'pendingWeight', val)} />,
            width: 150
        },
        {
            title: '操作', width: 80, fixed: 'right' as const,
            render: (_: any, record: any) =>
                <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => deleteProductRow(record.key)} />
        }
    ];

    return (
        <Card title="生产产品明细" size="small" style={{ marginBottom: 16 }} extra={
            <Space>
                <Button type="link" size="small" icon={<PlusOutlined />} onClick={addProductRow}>添加</Button>
                <Button type="link" size="small">快速填报</Button>
            </Space>
        }>
            <div style={{ overflowX: 'auto' }}>
                <Table
                    dataSource={productList}
                    columns={productColumns}
                    pagination={false}
                    size="small"
                    rowKey="key"
                    bordered
                    scroll={{ x: 'max-content' }}
                    components={{
                        header: {
                            cell: (props: any) => <th {...props} style={{ ...props.style, whiteSpace: 'nowrap' }} />
                        }
                    }}
                />
            </div>
            
            <DataSelectModal
                visible={modalVisible}
                onCancel={handleCancelSelect}
                onConfirm={handleConfirmSelect}
            />
        </Card>
    );
};