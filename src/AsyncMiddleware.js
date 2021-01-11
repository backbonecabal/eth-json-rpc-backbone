// tmp file - hardcode values here 

 return createAsyncMiddleware(async (req, res, _next) => {
    if (!BACKBONE_PROJECT_ID) {
      await setProjectId()
    }

    if (!BACKBONE_KEY) {
      await setBraveKey()
    }


// let BACKBONE_KEY = ''
// let BACKBONE_PROJECT_ID = ''
