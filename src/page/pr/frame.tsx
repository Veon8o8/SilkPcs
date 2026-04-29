
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePrProps<> {
}

class _FramePr extends React.Component<WithTranslation & FramePrProps> {
    render() {
        return (<>生产报工</>)
    }
}
export const FramePr = withTranslation()(_FramePr);