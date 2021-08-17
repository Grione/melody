import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

it(`Should WelcomeScreen render correctle`, () => {
	const tree = renderer.create(<WelcomeScreen errorCount={0} time={0} />).toJSON();

	expect(tree).toMatchSnapshot();
});
