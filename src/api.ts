const apiUrl: string = "https://api.github.com/search/users?q=";

type User = {
  login: string;
  url: string;
};

type UserRepos = {
  id: number;
  login: string;
  html_url: string;
  repos: number;
  total_count: number;
};

type UsersResponse = {
  users: UserRepos[];
  totalCount: number;
};

export async function getUsers(
  userName: string,
  page: number,
  perPage: number = 20
): Promise<UsersResponse> {
  const response = await fetch(
    `${apiUrl}${userName}&page=${page}&per_page=${perPage}`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Ошибка:", errorDetails);
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();
  const usersRepos = await Promise.all(
    data.items.map(async (user: User) => {
      const userDetails = await fetch(
        `https://api.github.com/users/${user.login}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      const userData = await userDetails.json();
      return { ...user, repos: userData.public_repos };
    })
  );

  return {
    users: usersRepos.sort((a, b) => b.repos - a.repos),
    totalCount: data.total_count,
  };
}
