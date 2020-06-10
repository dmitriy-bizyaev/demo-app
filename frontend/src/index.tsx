import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './containers/App';

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    users: {
                        merge(_, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),

    link: new HttpLink({
        uri: '/api/graphql',
    }),
});

function Entry() {
    return (
        <ApolloProvider client={client}>
            <CssBaseline />
            <App />
        </ApolloProvider>
    );
}

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    if (container) {
        ReactDOM.render(<Entry />, container);
    }
});
