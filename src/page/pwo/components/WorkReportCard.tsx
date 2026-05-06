// src/page/pwo/components/WorkReportCard.tsx

// 生产订单报工组件

import React from 'react';
import { Card, Button, Table, Input, InputNumber, Space, Tabs } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface WorkReportCardProps {
    luosiList: any[];
    nianxianList: any[];
    chengjiaoList: any[];
    chengtongList: any[];
    onUpdateLuosiList: (newList: any[]) => void;
    onUpdateNianxianList: (newList: any[]) => void;
    onUpdateChengjiaoList: (newList: any[]) => void;
    onUpdateChengtongList: (newList: any[]) => void;
}

export const WorkReportCard: React.FC<WorkReportCardProps> = ({
    luosiList,
    nianxianList,
    chengjiaoList,
    chengtongList,
    onUpdateLuosiList,
    onUpdateNianxianList,
    onUpdateChengjiaoList,
    onUpdateChengtongList,
}) => {
    const reportColumns = [
        { title: '序号', dataIndex: 'key', render: (_: any, __: any, index: number) => index + 1, width: 60 },
        { title: '项目名称', dataIndex: 'projectName', render: (text: string, record: any) => <Input defaultValue={text} bordered={false} onChange={(e) => updateCell(record.key, 'projectName', e.target.value, 'luosi')} /> },
        { title: '规格型号', dataIndex: 'specModel', render: (text: string, record: any) => <Input defaultValue={text} bordered={false} onChange={(e) => updateCell(record.key, 'specModel', e.target.value, 'luosi')} /> },
        { title: '单位', dataIndex: 'unit', render: (text: string, record: any) => <Input defaultValue={text} placeholder="请输入单位" bordered={false} onChange={(e) => updateCell(record.key, 'unit', e.target.value, 'luosi')} /> },
        { title: '数量', dataIndex: 'quantity', render: (value: number, record: any) => <InputNumber defaultValue={value} min={0} style={{ width: '100%' }} bordered={false} onChange={(val) => updateCell(record.key, 'quantity', val, 'luosi')} /> },
        { title: '操作', width: 80, render: (_: any, record: any) => <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => deleteReportRow(record.key, 'luosi')} /> }
    ];

    const updateCell = (key: string, field: string, value: any, type: string) => {
        const updateMap = {
            luosi: onUpdateLuosiList,
            nianxian: onUpdateNianxianList,
            chengjiao: onUpdateChengjiaoList,
            chengtong: onUpdateChengtongList,
        };
        const updateFn = updateMap[type as keyof typeof updateMap];
        const list = getListByType(type);
        updateFn(list.map(item => item.key === key ? { ...item, [field]: value } : item));
    };

    const getListByType = (type: string) => {
        const listMap = {
            luosi: luosiList,
            nianxian: nianxianList,
            chengjiao: chengjiaoList,
            chengtong: chengtongList,
        };
        return listMap[type as keyof typeof listMap];
    };

    const addReportRow = (type: string) => {
        const newKey = Date.now() + Math.random();
        const newRow = { key: newKey, projectName: '新报工', specModel: '', unit: '', quantity: 0 };
        const updateMap = {
            luosi: onUpdateLuosiList,
            nianxian: onUpdateNianxianList,
            chengjiao: onUpdateChengjiaoList,
            chengtong: onUpdateChengtongList,
        };
        const updateFn = updateMap[type as keyof typeof updateMap];
        const list = getListByType(type);
        updateFn([...list, newRow]);
    };

    const deleteReportRow = (key: string, type: string) => {
        const updateMap = {
            luosi: onUpdateLuosiList,
            nianxian: onUpdateNianxianList,
            chengjiao: onUpdateChengjiaoList,
            chengtong: onUpdateChengtongList,
        };
        const updateFn = updateMap[type as keyof typeof updateMap];
        const list = getListByType(type);
        updateFn(list.filter(item => item.key !== key));
    };

    const renderTable = (list: any[], type: string) => (
        <Table
            dataSource={list}
            columns={reportColumns.map(col => {
                if (col.title === '操作') {
                    return { ...col, render: (_: any, record: any) => <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => deleteReportRow(record.key, type)} /> };
                }
                if (col.title === '项目名称') {
                    return { ...col, render: (text: string, record: any) => <Input defaultValue={text} bordered={false} onChange={(e) => updateCell(record.key, 'projectName', e.target.value, type)} /> };
                }
                if (col.title === '规格型号') {
                    return { ...col, render: (text: string, record: any) => <Input defaultValue={text} bordered={false} onChange={(e) => updateCell(record.key, 'specModel', e.target.value, type)} /> };
                }
                if (col.title === '单位') {
                    return { ...col, render: (text: string, record: any) => <Input defaultValue={text} placeholder="请输入单位" bordered={false} onChange={(e) => updateCell(record.key, 'unit', e.target.value, type)} /> };
                }
                if (col.title === '数量') {
                    return { ...col, render: (value: number, record: any) => <InputNumber defaultValue={value} min={0} style={{ width: '100%' }} bordered={false} onChange={(val) => updateCell(record.key, 'quantity', val, type)} /> };
                }
                return col;
            })}
            pagination={false}
            size="small"
            rowKey="key"
            bordered
        />
    );

    return (
        <Card title="生产订单报工" size="small" style={{ marginBottom: 16 }} extra={
            <Space>
                <Button type="link" size="small" icon={<PlusOutlined />} onClick={() => addReportRow('luosi')}>添加</Button>
                <Button type="link" size="small">快速填报</Button>
            </Space>
        }>
            <Tabs
                defaultActiveKey="luosi"
                items={[
                    { key: 'luosi', label: '络丝', children: renderTable(luosiList, 'luosi') },
                    { key: 'nianxian', label: '捻线', children: renderTable(nianxianList, 'nianxian') },
                    { key: 'chengjiao', label: '成绞', children: renderTable(chengjiaoList, 'chengjiao') },
                    { key: 'chengtong', label: '成筒', children: renderTable(chengtongList, 'chengtong') },
                ]}
            />
        </Card>
    );
};