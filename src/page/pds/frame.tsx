
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePdsProps<> {
}

class _FramePds extends React.Component<WithTranslation & FramePdsProps> {
    render() {
        return (<>生产数据统计</>)
    }
}
export const FramePds = withTranslation()(_FramePds);