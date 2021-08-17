import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

it(`Should WelcomeScreen render correctle`, () => {
	const tree = renderer.create(<WelcomeScreen errorCount={0} time={0} onWelcomeButtonClick={jest.fn()} />).toJSON();

	expect(tree).toMatchSnapshot();
});
