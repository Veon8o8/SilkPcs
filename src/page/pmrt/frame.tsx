
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePmrtProps<> {
}

class _FramePmrt extends React.Component<WithTranslation & FramePmrtProps> {
    render() {
        return (<>生产领料</>)
    }
}
export const FramePmrt = withTranslation()(_FramePmrt);