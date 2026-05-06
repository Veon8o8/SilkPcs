// src/page/pwo/components/ProductionInfoCard.tsx

// 生产信息组件

import React from 'react';
import { Card, Form, Input, Select, DatePicker, Row, Col, Tag } from 'antd';

const { Option } = Select;

export const ProductionInfoCard: React.FC = () => {
    return (
        <Card title="生产信息" size="small" style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8, color: '#666', fontSize: 12 }}>
                <Tag color="blue">默认分组组、车间做"周"颗粒度生产派工工单</Tag>
                <span style={{ marginLeft: 8 }}>使用Tips：生产工单通过标签页，可以一站式完成生产工单业务流程</span>
            </div>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label="生产工单编号" name="workOrderNo">
                        <Input placeholder="自动生成无需填写" disabled />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="生产工单名称" name="workOrderName" rules={[{ required: true, message: '请输入工单名称' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="工单状态" name="orderStatus">
                        <Select>
                            <Option value="待派工">待派工</Option>
                            <Option value="生产中">已派工</Option>
                            <Option value="已完成">已完结</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="工单开始日期" name="startDate">
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label="工单完工日期" name="endDate">
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="未填写" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="产成品批次号" name="batchNo">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="工单负责人" name="responsiblePerson">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    {/* 占位空白，保持布局对齐 */}
                </Col>
            </Row>
        </Card>
    );
};