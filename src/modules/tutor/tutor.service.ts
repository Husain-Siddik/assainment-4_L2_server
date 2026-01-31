// import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
// import { PostWhereInput } from "../../../generated/prisma/models";
import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authorizeRoles";

export const createTutor = async (
    data: Omit<TutorProfile, "id" | "createdAt" | "userId">,
    userId: string,
    role: UserRole
) => {
    if (role !== UserRole.TUTOR) {

        return null;
    }


    const tutor = await prisma.tutorProfile.create({
        data: {
            ...data,
            userId,
        },
    });

    return tutor;
};




const getTutorById = async (id: number) => {
    const tutor = await prisma.tutorProfile.findUnique({

        omit: {
            createdAt: true
        },

        where: {
            id,

        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            categories: true,
            availability: true,
            reviews: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return tutor;
};



interface FilterOptions {
    categoryNames?: string[];
    minRating?: number | undefined;
}

const getAllTutor = async (options: FilterOptions) => {

    const { categoryNames, minRating } = options;

    const tutors = await prisma.tutorProfile.findMany({

        where: {
            AND: [
                categoryNames && categoryNames.length > 0

                    ? {
                        categories: {
                            some: {
                                name: { in: categoryNames },
                            },
                        },
                    }

                    : {},
                minRating !== undefined
                    ? {
                        rating: {
                            gte: minRating,
                        },
                    }
                    : {},
            ],
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            categories: true,
            availability: true,
            reviews: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },

    });

    return tutors;
};

// const getTutorByUserid = async (userId: string) => {

//     const tutor = await prisma.tutorProfile.findUnique({

//         where: { userId },
//         // include: {
//         //     user: {
//         //         select: {
//         //             id: true,
//         //             name: true,
//         //             email: true,
//         //             role: true,
//         //         },
//         //     },
//         //     categories: true,
//         //     availability: true,
//         //     reviews: {
//         //         include: {
//         //             student: {
//         //                 select: {
//         //                     id: true,
//         //                     name: true,
//         //                 },
//         //             },
//         //         },
//         //     },
//         // },
//     });

//     return tutor;
// };


const getTutorByUserId = async (userId: string) => {
    return await prisma.tutorProfile.findUnique({
        where: { userId },
    });
};


// const getAllPost = async ({
//     search,
//     tags,
//     isFeatured,
//     status,
//     authorId,
//     page,
//     limit,
//     skip,
//     sortBy,
//     sortOrder
// }: {
//     search: string | undefined,
//     tags: string[] | [],
//     isFeatured: boolean | undefined,
//     status: PostStatus | undefined,
//     authorId: string | undefined,
//     page: number,
//     limit: number,
//     skip: number,
//     sortBy: string,
//     sortOrder: string
// }) => {
//     const andConditions: PostWhereInput[] = []

//     if (search) {
//         andConditions.push({
//             OR: [
//                 {
//                     title: {
//                         contains: search,
//                         mode: "insensitive"
//                     }
//                 },
//                 {
//                     content: {
//                         contains: search,
//                         mode: "insensitive"
//                     }
//                 },
//                 {
//                     tags: {
//                         has: search
//                     }
//                 }
//             ]
//         })
//     }

//     if (tags.length > 0) {
//         andConditions.push({
//             tags: {
//                 hasEvery: tags as string[]
//             }
//         })
//     }

//     if (typeof isFeatured === 'boolean') {
//         andConditions.push({
//             isFeatured
//         })
//     }

//     if (status) {
//         andConditions.push({
//             status
//         })
//     }

//     if (authorId) {
//         andConditions.push({
//             authorId
//         })
//     }

//     const allPost = await prisma.post.findMany({
//         take: limit,
//         skip,
//         where: {
//             AND: andConditions
//         },
//         orderBy: {
//             [sortBy]: sortOrder
//         },
//         include: {
//             _count: {
//                 select: { comments: true }
//             }
//         }
//     });

//     const total = await prisma.post.count({
//         where: {
//             AND: andConditions
//         }
//     })
//     return {
//         data: allPost,
//         pagination: {
//             total,
//             page,
//             limit,
//             totalPages: Math.ceil(total / limit)
//         }
//     };
// }

// const getTutorById = async (postId: string) => {
//     return await prisma.$transaction(async (tx) => {
//         await tx.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 views: {
//                     increment: 1
//                 }
//             }
//         })
//         const postData = await tx.post.findUnique({
//             where: {
//                 id: postId
//             },
//             include: {
//                 comments: {
//                     where: {
//                         parentId: null,
//                         status: CommentStatus.APPROVED
//                     },
//                     orderBy: { createdAt: "desc" },
//                     include: {
//                         replies: {
//                             where: {
//                                 status: CommentStatus.APPROVED
//                             },
//                             orderBy: { createdAt: "asc" },
//                             include: {
//                                 replies: {
//                                     where: {
//                                         status: CommentStatus.APPROVED
//                                     },
//                                     orderBy: { createdAt: "asc" }
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 _count: {
//                     select: { comments: true }
//                 }
//             }
//         })
//         return postData
//     })
// }

// const getMyPosts = async (authorId: string) => {
//     await prisma.user.findUniqueOrThrow({
//         where: {
//             id: authorId,
//             status: "ACTIVE"
//         },
//         select: {
//             id: true
//         }
//     })


//     const result = await prisma.post.findMany({
//         where: {
//             authorId
//         },
//         orderBy: {
//             createdAt: "desc"
//         },
//         include: {
//             _count: {
//                 select: {
//                     comments: true
//                 }
//             }
//         }
//     });

//     // const total = await prisma.post.aggregate({
//     //     _count: {
//     //         id: true
//     //     },
//     //     where: {
//     //         authorId
//     //     }
//     // })

//     return result;
// }

// //**
// // user - sudhu nijar post update korta parbe, isFeatured update korta parbe na
// // admin - sobar post update korta parbe.
// // */

// const updatePost = async (postId: string, data: Partial<Post>, authorId: string, isAdmin: boolean) => {
//     const postData = await prisma.post.findUniqueOrThrow({
//         where: {
//             id: postId
//         },
//         select: {
//             id: true,
//             authorId: true
//         }
//     })

//     if (!isAdmin && (postData.authorId !== authorId)) {
//         throw new Error("You are not the owner/creator of the post!")
//     }

//     if (!isAdmin) {
//         delete data.isFeatured
//     }

//     const result = await prisma.post.update({
//         where: {
//             id: postData.id
//         },
//         data
//     })

//     return result;

// }

// //** 
// // 1. user - nijar created post delete korta parbe
// // 2. admin - sobar post delete korta parbe
// // */

// const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
//     const postData = await prisma.post.findUniqueOrThrow({
//         where: {
//             id: postId
//         },
//         select: {
//             id: true,
//             authorId: true
//         }
//     })

//     if (!isAdmin && (postData.authorId !== authorId)) {
//         throw new Error("You are not the owner/creator of the post!")
//     }

//     return await prisma.post.delete({
//         where: {
//             id: postId
//         }
//     })

// }

// const getStats = async () => {
//     return await prisma.$transaction(async (tx) => {
//         const [totalPosts, publlishedPosts, draftPosts, archivedPosts, totalComments, approvedComment, totalUsers, adminCount, userCount, totalViews] =
//             await Promise.all([
//                 await tx.post.count(),
//                 await tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
//                 await tx.post.count({ where: { status: PostStatus.DRAFT } }),
//                 await tx.post.count({ where: { status: PostStatus.ARCHIVED } }),
//                 await tx.comment.count(),
//                 await tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
//                 await tx.user.count(),
//                 await tx.user.count({ where: { role: "ADMIN" } }),
//                 await tx.user.count({ where: { role: "USER" } }),
//                 await tx.post.aggregate({
//                     _sum: { views: true }
//                 })
//             ])

//         return {
//             totalPosts,
//             publlishedPosts,
//             draftPosts,
//             archivedPosts,
//             totalComments,
//             approvedComment,
//             totalUsers,
//             adminCount,
//             userCount,
//             totalViews: totalViews._sum.views
//         }
//     })

// }

export const TutorService = {
    createTutor,
    getTutorById,
    getAllTutor,
    getTutorByUserId,
    // getAllPost,
    // getPostById,
    // getMyPosts,
    // updatePost,
    // deletePost,
    // getStats
}