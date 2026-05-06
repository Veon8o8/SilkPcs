// src/page/pwo/components/ProductDetailTable.tsx

// 生产产品明细组件

import React from 'react';
import { Card, Button, Table, Input, InputNumber, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface ProductDetailTableProps {
    productList: any[];
    onUpdateList: (newList: any[]) => void;
}

export const ProductDetailTable: React.FC<ProductDetailTableProps> = ({ productList, onUpdateList }) => {
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

    const productColumns = [
        { title: '序号', dataIndex: 'key', render: (_: any, __: any, index: number) => index + 1, width: 60, fixed: 'left' as const },
        { title: '选择数据', dataIndex: 'selectData', render: (text: string, record: any) => <Input defaultValue={text} placeholder="请选择" bordered={false} onChange={(e) => updateCell(record.key, 'selectData', e.target.value)} />, width: 120, fixed: 'left' as const },
        { title: '产品名称(批号)', dataIndex: 'productName', render: (text: string, record: any) => <Input defaultValue={text} placeholder="请输入产品名称/批号" bordered={false} onChange={(e) => updateCell(record.key, 'productName', e.target.value)} />, width: 160, fixed: 'left' as const },
        { title: '计划生产重量(吨)', dataIndex: 'planWeight', render: (value: number, record: any) => <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" onChange={(val) => updateCell(record.key, 'planWeight', val)} />, width: 150 },
        { title: '产品编码', dataIndex: 'productCode', render: (text: string, record: any) => <Input defaultValue={text} placeholder="请输入产品编码" bordered={false} onChange={(e) => updateCell(record.key, 'productCode', e.target.value)} />, width: 130 },
        { title: '生产单位', dataIndex: 'productionUnit', render: (text: string, record: any) => <Input defaultValue={text} placeholder="请输入生产单位" bordered={false} onChange={(e) => updateCell(record.key, 'productionUnit', e.target.value)} />, width: 120 },
        { title: '已生产数量(吨)', dataIndex: 'producedWeight', render: (value: number, record: any) => <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" onChange={(val) => updateCell(record.key, 'producedWeight', val)} />, width: 150 },
        { title: '待生产数量(吨)', dataIndex: 'pendingWeight', render: (value: number, record: any) => <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" onChange={(val) => updateCell(record.key, 'pendingWeight', val)} />, width: 150 },
        { title: '操作', width: 80, fixed: 'right' as const, render: (_: any, record: any) => <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => deleteProductRow(record.key)} /> }
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
        </Card>
    );
};