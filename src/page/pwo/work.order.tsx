// src/page/pwo/frame.tsx

// 生产工单框架

import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { SucResponse, ErrResponse } from '../../config/type';
import { LOCAL_STORAGE } from '../../config/keys';
import { httpUtil } from '../../utils/HttpUtil';
import { timeUtil } from '../../utils/TimeUtil';
import { WorkOrderApi } from '../../config/api';
import { PlusOutlined } from '@ant-design/icons';
import '../../css/pwo/work.order.css'; // 引入CSS文件

// 生产工单数据类型
interface WorkOrderType {
    id: number;
    workOrderNo: string;           // 生产工单编号
    workOrderName: string;         // 生产工单名称
    workOrderStatus: string;       // 工单状态
    productCode: string;           // 产品编码
    productName: string;           // 生产产品明细
    productAttribute: string;      // 产品属性
    specification: string;         // 规格型号
    plannedWeight: number;         // 计划生产重量（吨）
    productionUnit: string;        // 生产单位
    planStartDate: string;         // 工单开始日期
    planEndDate: string;           // 工单完工日期
    actualStartTime: string;       // 开工时间
    actualEndTime: string;         // 完工时间
    materialList?: MaterialType[]; // 计划原料产品明细
    submitter: string;             // 提交人
    submitTime: string;            // 提交时间
}

// 原料数据类型
interface MaterialType {
    name: string;          // 产品（原料）名称
    attribute: string;     // 产品属性
    specification: string; // 规格型号
    quantity: number;      // 领料数量
    unit: string;          // 单位
}

// 汇总数据类型
interface SummaryType {
    totalWeight: number;   // 总计重量
    totalCount: number;    // 总计数量
}

interface WorkOrderProps {
    headerHeight: number;
}

interface WorkOrderState {
    filters: {
        status: string;
        workOrderName: string;
        startDate: string;
        endDate: string;
    };
    currentPage: number;
    pageSize: number;
    dataSource: WorkOrderType[];
    summary: SummaryType;
}

class _WorkOrder extends React.Component<
    WithTranslation & WorkOrderProps,
    WorkOrderState
> {
    constructor(props: WithTranslation & WorkOrderProps) {
        super(props);
        this.state = {
            filters: {
                status: '',
                workOrderName: '',
                startDate: '',
                endDate: '',
            },
            currentPage: 1,
            pageSize: 20,
            dataSource: [],
            summary: {
                totalWeight: 0,
                totalCount: 0,
            },
        };
    }

    componentDidMount(): void {
        this.getWorkOrderList();
    }

    // 获取生产工单列表
    getWorkOrderList = async () => {
        const params = {
            token: localStorage.getItem(LOCAL_STORAGE.TOKEN),
        }
        let response = await httpUtil.post(WorkOrderApi.LIST, params)
        if (response?.code == 200) {
            const r = response as SucResponse
            console.log(`获取生产工单列表成功:\n`, r.data.list);
            const list = r.data.list
            const dataSource: WorkOrderType[] = []
            let totalWeight = 0;
            for (let i = 0; i < list.length; i++) {
                const item = list[i]
                dataSource.push({
                    id: item.id,
                    workOrderNo: item.workOrderNo,
                    workOrderName: item.workOrderName,
                    workOrderStatus: item.workOrderStatus,
                    productCode: item.productCode,
                    productName: item.productName,
                    productAttribute: item.productAttribute,
                    specification: item.specification,
                    plannedWeight: item.plannedWeight,
                    productionUnit: item.productionUnit,
                    planStartDate: item.planStartDate,
                    planEndDate: item.planEndDate,
                    actualStartTime: item.actualStartTime,
                    actualEndTime: item.actualEndTime,
                    materialList: item.materialList,
                    submitter: item.submitter,
                    submitTime: timeUtil.formatTimestamp(item.submitTime),
                })
                totalWeight += Number(item.plannedWeight) || 0;
            }
            this.setState({ 
                dataSource: dataSource,
                summary: {
                    totalWeight: totalWeight,
                    totalCount: dataSource.length,
                }
            });
        }
        else if ((response?.code == 400)) {
            const r = response as ErrResponse
            console.error(`获取生产工单列表失败: [${r.errCode}] ${r.errMsg}`);
            httpUtil.tryGotoLogin(r);
        }
    }

    // 筛选条件变更
    handleFilterChange = (key: string, value: string) => {
        this.setState(
            (prevState) => ({
                filters: { ...prevState.filters, [key]: value },
                currentPage: 1,
            })
        );
    };

    // 重置筛选
    handleReset = () => {
        this.setState({
            filters: {
                status: '',
                workOrderName: '',
                startDate: '',
                endDate: '',
            },
            currentPage: 1,
        });
    };

    // 查询
    handleSearch = () => {
        this.setState({ currentPage: 1 });
    };

    // 添加工单
    handleAddWorkOrder = () => {
        // TODO: 打开添加工单弹框
        console.log('添加工单');
    };

    // 获取筛选后的数据
    getFilteredData = (): WorkOrderType[] => {
        const { dataSource, filters } = this.state;

        if (!dataSource) return [];

        return dataSource.filter((item) => {
            // 工单状态筛选
            if (filters.status && item.workOrderStatus !== filters.status) {
                return false;
            }
            // 工单名称模糊筛选
            if (filters.workOrderName && !item.workOrderName.includes(filters.workOrderName)) {
                return false;
            }
            // 开始日期筛选
            if (filters.startDate && item.planStartDate < filters.startDate) {
                return false;
            }
            // 结束日期筛选
            if (filters.endDate && item.planEndDate > filters.endDate) {
                return false;
            }
            return true;
        });
    };

    // 获取当前页数据
    getCurrentPageData = (filteredList: WorkOrderType[]): WorkOrderType[] => {
        const { currentPage, pageSize } = this.state;
        const start = (currentPage - 1) * pageSize;
        return filteredList.slice(start, start + pageSize);
    };

    // 获取状态样式类名
    getStatusClassName = (status: string): string => {
        const statusClassMap: { [key: string]: string } = {
            '已完成': 'pwo-status-completed',
            '进行中': 'pwo-status-in-progress',
            '待开始': 'pwo-status-pending',
            '已延期': 'pwo-status-delayed',
        };
        return statusClassMap[status] || 'pwo-status-default';
    };

    // 渲染状态标签
    renderStatus = (status: string) => {
        const statusClassName = this.getStatusClassName(status);
        return (
            <span className={`pwo-status-badge ${statusClassName}`}>
                {status}
            </span>
        );
    };

    // 渲染汇总行
    renderSummaryRow = () => {
        const { summary, filters } = this.state;
        const filteredData = this.getFilteredData();
        const displaySummary = filters.status || filters.workOrderName || filters.startDate || filters.endDate
            ? {
                totalWeight: filteredData.reduce((sum, item) => sum + (Number(item.plannedWeight) || 0), 0),
                totalCount: filteredData.length,
            }
            : summary;

        return (
            <tr className="pwo-summary-row">
                <td className="pwo-summary-td" colSpan={4}>
                    <strong>合计</strong>
                </td>
                <td className="pwo-summary-td" colSpan={1}>
                    <strong>{displaySummary.totalCount}</strong>
                </td>
                <td className="pwo-summary-td" colSpan={4}>
                    <strong>{displaySummary.totalWeight.toFixed(2)} 吨</strong>
                </td>
                <td className="pwo-summary-td" colSpan={8}>
                    {/* 空白占位 */}
                </td>
            </tr>
        );
    };

    // 渲染分页
    renderPagination = (total: number) => {
        const { currentPage, pageSize } = this.state;
        const totalPages = Math.ceil(total / pageSize);

        if (totalPages <= 1 && total <= pageSize) return null;

        return (
            <div className="pwo-pagination">
                <button
                    className="pwo-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => this.setState({ currentPage: currentPage - 1 })}
                >
                    上一页
                </button>
                <span className="pwo-page-info">
                    第 {currentPage} / {totalPages} 页
                </span>
                <button
                    className="pwo-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => this.setState({ currentPage: currentPage + 1 })}
                >
                    下一页
                </button>
                <select
                    className="pwo-page-size-select"
                    value={pageSize}
                    onChange={(e) => this.setState({ pageSize: Number(e.target.value), currentPage: 1 })}
                >
                    <option value={10}>10条/页</option>
                    <option value={20}>20条/页</option>
                    <option value={50}>50条/页</option>
                </select>
            </div>
        );
    };

    // 渲染表格
    renderTable = () => {
        const filteredData = this.getFilteredData();
        const currentPageData = this.getCurrentPageData(filteredData);
        const totalCount = filteredData.length;

        return (
            <div className="pwo-table-section">
                <div className="pwo-table-wrapper">
                    <table className="pwo-table">
                        <thead>
                            <td className="pwo-table-head-row">
                                <th>工单状态</th>
                                <th>生产工单名称</th>
                                <th>工单开始日期</th>
                                <th>工单完工日期</th>
                                <th>生产产品明细</th>
                                <th>产品编码</th>
                                <th>产品属性</th>
                                <th>规格型号</th>
                                <th>计划生产重量（吨）</th>
                                <th>生产单位</th>
                                <th>开工时间</th>
                                <th>完工时间</th>
                                <th>生产工单编号</th>
                                <th>提交人</th>
                                <th>提交时间</th>
                            </td>
                        </thead>
                        <tbody>
                            {currentPageData.map((item, idx) => (
                                <tr 
                                    key={item.id} 
                                    className="pwo-table-row"
                                    style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9fafb' }}
                                >
                                    <td>{this.renderStatus(item.workOrderStatus)}</td>
                                    <td>{item.workOrderName}</td>
                                    <td>{item.planStartDate}</td>
                                    <td>{item.planEndDate}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.productCode}</td>
                                    <td>{item.productAttribute}</td>
                                    <td>{item.specification}</td>
                                    <td>{item.plannedWeight}</td>
                                    <td>{item.productionUnit}</td>
                                    <td>{item.actualStartTime}</td>
                                    <td>{item.actualEndTime}</td>
                                    <td>{item.workOrderNo}</td>
                                    <td>{item.submitter}</td>
                                    <td>{item.submitTime}</td>
                                </tr>
                            ))}
                            {/* 汇总行 - 始终在表格底部 */}
                            {this.renderSummaryRow()}
                        </tbody>
                    </table>
                </div>
                <div className="pwo-table-footer">
                    <span className="pwo-total-info">共 {totalCount} 条</span>
                    {this.renderPagination(totalCount)}
                </div>
            </div>
        );
    };

    render() {
        const { filters } = this.state;

        const statusOptions = [
            { value: '', label: '全部' },
            { value: '已完成', label: '已完成' },
            { value: '进行中', label: '进行中' },
            { value: '待开始', label: '待开始' },
            { value: '已延期', label: '已延期' },
        ];

        return (
            <div className="pwo-container">
                {/* 筛选区域 - 左侧添加按钮，右侧搜索条件 */}
                <div className="pwo-filter-section">
                    <div className="pwo-filter-row">
                        <div className="pwo-filter-left">
                            <button className="pwo-add-btn" onClick={this.handleAddWorkOrder}>
                                <PlusOutlined /> 添加
                            </button>
                        </div>
                        <div className="pwo-filter-right">
                            <div className="pwo-filter-item">
                                <select
                                    className="pwo-filter-select"
                                    value={filters.status}
                                    onChange={(e) => this.handleFilterChange('status', e.target.value)}
                                >
                                    {statusOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="pwo-filter-item">
                                <input
                                    type="text"
                                    className="pwo-filter-input"
                                    placeholder="生产工单名称"
                                    value={filters.workOrderName}
                                    onChange={(e) => this.handleFilterChange('workOrderName', e.target.value)}
                                />
                            </div>
                            <div className="pwo-filter-item">
                                <input
                                    type="date"
                                    className="pwo-filter-input"
                                    placeholder="工单开始日期"
                                    value={filters.startDate}
                                    onChange={(e) => this.handleFilterChange('startDate', e.target.value)}
                                />
                            </div>
                            <div className="pwo-filter-item">
                                <input
                                    type="date"
                                    className="pwo-filter-input"
                                    placeholder="工单完工日期"
                                    value={filters.endDate}
                                    onChange={(e) => this.handleFilterChange('endDate', e.target.value)}
                                />
                            </div>
                            <button className="pwo-search-btn" onClick={this.handleSearch}>
                                查询
                            </button>
                            <button className="pwo-reset-btn" onClick={this.handleReset}>
                                重置
                            </button>
                        </div>
                    </div>
                </div>

                {/* 表格区域 */}
                {this.renderTable()}
            </div>
        );
    }
}

export const WorkOrder = withTranslation()(_WorkOrder);