import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import App from '../App'

import '@testing-library/jest-dom'

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

describe('App', () => {
    it('renders the App component', async () => {
        render(<App />)

        const title = await screen.findByRole('heading');
        const button = await screen.findByRole('button', { name: 'counter button' });

        // button is on the page
        // verify title content

        console.log("button is found")
        let expectedContent = 'Vite + React + Typescript'
        expect(title).toHaveTextContent(expectedContent);
        console.log("title is found")
    })

    it('renders the App component', async () => {
        render(<App />)

        // const title = await screen.findByRole('heading');
        const button = await screen.findByRole('button', { name: 'counter button' });

        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);

        console.log("button is found")
        expect(button).toHaveTextContent('count is 3');

        await userEvent.click(button);
        await userEvent.click(button);

        expect(button).toHaveTextContent('count is 5');
    })

    describe('login module', () => {

        it('can log user with proper password', async () => {

            const server = setupServer(
                http.post('/login', () => {
                    return HttpResponse.text('OK');
                })
            );
            server.listen();
        
            render(<App />)
            const emailField = await screen.findByLabelText('email');
            const passwordField = await screen.findByLabelText('password');
            const loginButton = await screen.findByLabelText('login button');

            await userEvent.type(emailField, 'louis@wcs.com');
            await userEvent.type(passwordField, 'fsjdlkfglsjfslj');

            await userEvent.click(loginButton);

            const loggedUserPanel = await screen.findByLabelText('logged user email');

            expect(loggedUserPanel).toHaveTextContent('Logged user email is louis@wcs.com');

            server.close();
        })

        it('refuses login if password is too short', async () => {

            const server = setupServer(
                http.post('/login', () => {
                    return HttpResponse.text('login failed');
                })
            );
            server.listen();

            render(<App />)
            const emailField = await screen.findByLabelText('email');
            const passwordField = await screen.findByLabelText('password');
            const loginButton = await screen.findByLabelText('login button');

            await userEvent.type(emailField, 'louis@wcs.com');
            await userEvent.type(passwordField, 'a');

            await userEvent.click(loginButton);

            try {
                const loggedUserPanel = await screen.findByLabelText('logged user email');
                // si on arrive là -> le login n'aurait pas du marcher mais on a un panel
                fail(`the logged user panel exists whereas login / pass were invalid`);
            } catch (e) {
                console.log("-> le panel de logged user n'existe pas -> success")

                const loginErrorPanel = await screen.findByLabelText('login error panel');
                expect(loginErrorPanel).not.toBeEmptyDOMElement();
            }

            server.close();
        })

    })
})