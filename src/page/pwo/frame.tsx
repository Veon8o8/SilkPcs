// src/page/pwo/frame.tsx

import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import '../../css/pwo/frame.css'; // 引入CSS文件
import { WorkOrder } from './work.order';

// TAB 类型定义
type TabKey = 'production' | 'all' | 'pending' | 'assigned' | 'completed';

interface TabItem {
    key: TabKey;
    label: string;
}

interface FramePwoProps {
    headerHeight: number;
}

interface FramePwoState {
    activeTab: TabKey;
}

class _FramePwo extends React.Component<
    WithTranslation & FramePwoProps,
    FramePwoState
> {
    constructor(props: WithTranslation & FramePwoProps) {
        super(props);
        this.state = {
            activeTab: 'all', // 修改为 'all'，默认显示"所有工单"
        };
    }

    // TAB 列表
    getTabList = (): TabItem[] => {
        return [
            { key: 'production', label: '生产工单排产' },
            { key: 'all', label: '所有工单' },
            { key: 'pending', label: '待派工' },
            { key: 'assigned', label: '已派工' },
            { key: 'completed', label: '已完结' },
        ];
    };

    // 切换 TAB
    handleTabChange = (tabKey: TabKey) => {
        this.setState({ activeTab: tabKey });
    };

    // 渲染对应 TAB 的内容
    renderTabContent = () => {
        const { activeTab } = this.state;
        const { headerHeight } = this.props;

        switch (activeTab) {
            case 'production':
                return (
                    <div className="pwo-tab-content">
                        {/* 生产工单排产内容 - 待添加 */}
                        <div className="pwo-empty-state">
                            <div className="pwo-empty-icon">📋</div>
                            <div className="pwo-empty-text">生产工单排产内容</div>
                            <div className="pwo-empty-desc">稍后添加</div>
                        </div>
                    </div>
                );
            case 'all':
                return (
                    <div className="pwo-tab-content">
                        <WorkOrder
                            headerHeight={headerHeight}
                        />
                    </div>
                );
            case 'pending':
                return (
                    <div className="pwo-tab-content">
                        {/* 待派工内容 - 待添加 */}
                        <div className="pwo-empty-state">
                            <div className="pwo-empty-icon">⏳</div>
                            <div className="pwo-empty-text">待派工</div>
                            <div className="pwo-empty-desc">稍后添加</div>
                        </div>
                    </div>
                );
            case 'assigned':
                return (
                    <div className="pwo-tab-content">
                        {/* 已派工内容 - 待添加 */}
                        <div className="pwo-empty-state">
                            <div className="pwo-empty-icon">✅</div>
                            <div className="pwo-empty-text">已派工</div>
                            <div className="pwo-empty-desc">稍后添加</div>
                        </div>
                    </div>
                );
            case 'completed':
                return (
                    <div className="pwo-tab-content">
                        {/* 已完结内容 - 待添加 */}
                        <div className="pwo-empty-state">
                            <div className="pwo-empty-icon">🎉</div>
                            <div className="pwo-empty-text">已完结</div>
                            <div className="pwo-empty-desc">稍后添加</div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    render() {
        const { activeTab } = this.state;
        const tabList = this.getTabList();

        return (
            <div className="pwo-container">
                {/* TAB 标签栏 */}
                <div className="pwo-tabs">
                    {tabList.map((tab) => (
                        <button
                            key={tab.key}
                            className={`pwo-tab-btn ${activeTab === tab.key ? 'pwo-tab-btn-active' : ''}`}
                            onClick={() => this.handleTabChange(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB 内容区域 */}
                <div className="pwo-tabs-content">
                    {this.renderTabContent()}
                </div>
            </div>
        );
    }
}

export const FramePwo = withTranslation()(_FramePwo);