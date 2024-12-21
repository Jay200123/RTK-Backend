// import BlackList from "../routes/authentication/model";

// const generateBlacklist = async (token: string) => {
//     return await BlackList.create({ token });
// };

// const findBlacklist = async (token: string) => {
//     const data = await BlackList.findOne({ token });
//     return !!data;
// }

// async function cleanBlacklistToken() {
//     const expiryDate = new Date(Date.now() - 1 * 60 * 60 * 1000);
//     await BlackList.deleteMany({ createdAt: { $lt: expiryDate } });
// }

// setInterval(cleanBlacklistToken, 3600000);

// export {
//     generateBlacklist,
//     findBlacklist
// }