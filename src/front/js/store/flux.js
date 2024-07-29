const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
			posts:[],
        },
        actions: {
            // Use getActions to call a function within a function

            register: async(email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password })
                    });
                    if (!response.ok) {
                        return false
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.log(error)
                }
            },
            login: async(email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password })
                    });
                    if (!response.ok) {
                        return false
                    }
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    setStore({ token: data.token });
                    return true;
                } catch (error) {
                    console.log(error)
                }
            },
            addPost: async(content) => {
                const jwtToken = localStorage.getItem("token")

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/post", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${jwtToken}`,
                        },
                        body: JSON.stringify({ content }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Post created successfully:", data);
                    } else {
                        console.error("Error creating post:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error creating post:", error);
                }
            },
			getPosts: async() => {
				const jwtToken = localStorage.getItem("token")
				try{
					const response = await fetch(process.env.BACKEND_URL + "/api/post/me", {
						headers: {
							"authorization": `Bearer ${jwtToken}`, 
						}
					}

					)
					if (!response.ok){
						return false;
					}
					const data = await response.json()
					setStore({posts: data.posts})

				}catch(error){
					console.group(error)
				}
			},
			logout: () => {
                localStorage.removeItem("token");
                setStore({ token: null });
            },
        }
    };
};

export default getState;
