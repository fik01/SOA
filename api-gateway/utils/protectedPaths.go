package utils

type Path struct {
	Path string
	Role string // Roles {Tourist, Author, Admin} ; leave empty for all roles
}

func GetProtectedPaths() []*Path {
	return []*Path{
		{
			Path: "/api/tourist/tourrating",
			Role: "",
		},
		{
			Path: "/api/administration/equipment",
			Role: "",
		},
		{
			Path: "/api/tourist/positionSimulator",
			Role: "",
		},
	}
}