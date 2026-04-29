
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePpProps<> {
}

class _FramePp extends React.Component<WithTranslation & FramePpProps> {
    render() {
        return (<>生产工序</>)
    }
}
export const FramePp = withTranslation()(_FramePp);