import React from 'react';

interface ModalTextProps {
    data: {
        url?: string;
        title?: string;
        copyright?: string;
        explanation?: string;
    };
}

const ModalText: React.FC<ModalTextProps> = ({ data }) => {
    return (
        <div className="pt-1">
            <div className="imageNASA">
                {data?.url ? <img src={`${data.url}`} alt="MDN" /> : null}
            </div>
            {data?.title ? (
                <p className="px-3 fs-20 mb-1 mt-3">
                    <span className="text-center text-secondary fw-600">
                        Title Image:{' '}
                    </span>
                    {data?.title}
                </p>
            ) : null}
            {data?.copyright ? (
                <p className="px-3 fs-20 mb-1">
                    <span className="text-center text-secondary fw-600">Copyright: </span>
                    {data?.copyright}
                </p>
            ) : null}
            {data?.explanation ? (
                <p className="px-3 fs-20 mb-1">
                    <span className="text-center text-secondary fw-600">
                        Explanation:{' '}
                    </span>
                    {data?.explanation}
                </p>
            ) : null}
        </div>
    );
}

export default ModalText;
