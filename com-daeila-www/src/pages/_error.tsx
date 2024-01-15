import Layout from '../components/Layout';
import React from 'react';
import Link from 'next/link';
import { NextPageContext } from 'next';

interface ErrorProps {
    statusCode: number | null;
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-6xl font-bold">{statusCode || 'Error'}</h1>
                <p className="text-xl">
                    {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
                </p>
                <Link href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Go Home</Link>
            </div>
        </Layout>
    );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;