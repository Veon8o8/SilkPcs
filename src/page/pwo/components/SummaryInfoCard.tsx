// src/page/pwo/components/SummaryInfoCard.tsx

// 合计统计组件

import React from 'react';
import { Card, Form, Input, Row, Col } from 'antd';

export const SummaryInfoCard: React.FC = () => {
    return (
        <Card title="合计统计" size="small">
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item label="合计生产框数（70个）" name="totalBox70">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计生产框数（80个）" name="totalBox80">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计产量" name="totalOutput">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计间隔" name="totalInterval">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计净产量" name="netOutput">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计废丝" name="totalWaste">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计多余个数" name="totalExcess">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="合计多余个数重量" name="totalExcessWeight">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};