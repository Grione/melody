const AVATAR_URL = `https://api.adorable.io/avatars/128`;

export default [
	{
		type: `genre`,
		genre: `rock`,
		answers: [
			{
        id: 'id1',
				src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
				genre: `rock`
			},
			{
        id: 'id2',
				src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
				genre: `blues`
			},
			{
        id: 'id3',
				src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
				genre: `jazz`
			},
			{
        id: 'id4',
				src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
				genre: `rock`
			}
		]
	},
	{
		type: `artist`,
		song: {
			artist: `Jim Beam`,
			src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`
		},
		answers: [
			{
        id: 'id1',
				picture: `${AVATAR_URL}/${Math.random()}`,
				artist: `John Daniels`
			},
			{
        id: 'id2',
				picture: `${AVATAR_URL}/${Math.random()}`,
				artist: `John Daniels`
			},
			{
        id: 'id3',
				picture: `${AVATAR_URL}/${Math.random()}`,
				artist: `John Daniels`
			}
		]
	}
];
