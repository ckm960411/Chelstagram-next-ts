export const posts: PostTypes[] = [
  {
    id: 771424532442,
    author: {
      userId: 1083202038539,
      nickname: '킹운트',
      profileImg: "https://resources.premierleague.com/premierleague/photos/players/250x250/p184341.png",
    },
    createdAt: '2022-02-08 12:00:00',
    modifiedAt: '2022-02-09 08:00:00',
    content: {
      postText: "어쩔티비 저쩔티비 아주 그냥 화났쥬?",
      postImg: ["https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/62BD/production/_122077252_chelsea-main.jpg"],
    },
    likes: 20000,
    liked: true,
    comments: [
      {
        id: 365533127096,
        postId: 771424532442,
        userId: 149765870964,
        nickname: '조진호',
        profileImg: null,
        text: '솔직히 내가 다했지',
        createdAt: '2022-02-08 12:30:00',
        modifiedAt: '2022-02-08 12:30:00',
      }
    ]
  },
]