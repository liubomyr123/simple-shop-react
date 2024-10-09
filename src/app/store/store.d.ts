declare type RootState = ReturnType<typeof import("./rootReducer").default>;
declare type AppStore = ReturnType<typeof import("./index").setupStore>;
declare type AppDispatch = AppStore["dispatch"];
