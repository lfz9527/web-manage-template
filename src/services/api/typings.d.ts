declare namespace API {
  type AIPromptWordScencEnum = 1 | 2 | 3;

  type DealOfferTypeEnum = 1 | 2;

  type DealsExpireTypeEnum = 1 | 2;

  type DealsTypeEnum = 1 | 2 | 3;

  type EntitiesBase = {
    /** 创建时间 */
    createTime?: string;
  };

  type FBAIPromptWord = {
    aIPromptWordId?: number;
    /** 设定的角色 */
    promptRole?: string;
    /** 提示词内容 */
    promptWordContent?: string;
    promptWordScenc?: AIPromptWordScencEnum;
  };

  type FBBatchAddUser = {
    webSiteId?: number;
    count?: number;
  };

  type FBBrand = {
    /** 品牌的唯一标识符 */
    brandId?: number;
    /** 分类Id */
    goodCategoryId?: number;
    /** 品牌的名称 */
    brandName?: string;
    /** 对品牌的详细描述信息 */
    brandDescribe?: string;
    /** 品牌logo对应的唯一标识符 */
    logoImageId?: number;
    /** 表示品牌是否处于在线状态 */
    isOnline?: boolean;
    /** 表示品牌是否为热门品牌 */
    isHot?: boolean;
  };

  type FBCheckEmailCode = {
    tempKey?: string;
    code?: string;
  };

  type FBCopyGood = {
    ids?: number[];
    webSiteId?: number;
  };

  type FBDealJoin = {
    /** 优惠提交Id */
    dealJoinId?: number;
    /** 网站链接 */
    webSiteLink?: string;
    /** 优惠信息类型 */
    offerType?: number;
    /** 券码 */
    dealCode?: string;
    /** 优惠说明 */
    discountDescription?: string;
    /** 过期时间 */
    expirationTime?: string;
    /** 邮箱 */
    email?: string;
  };

  type FBDeals = {
    dealsId?: number;
    shopSiteId?: number;
    brandId?: number;
    dealsCode?: string;
    dealsName?: string;
    imageId?: number;
    minAmount?: number;
    minCount?: number;
    dealsAmount?: number;
    dealsDiscount?: number;
    dealsType?: number;
    startTime?: string;
    endTime?: string;
    expireDay?: number;
    expireType?: number;
    dealsNote?: string;
    isShelves?: boolean;
    isHot?: boolean;
  };

  type FBEmailCode = {
    email?: string;
    password?: string;
    isRegister?: boolean;
  };

  type FBFriendLink = {
    friendLinkId?: number;
    /** 友情链接名称 */
    friendName?: string;
    /** 友情链接 */
    friendLink?: string;
    /** 友情链接Logo */
    logoImageId?: number;
  };

  type FBGood = {
    /** 商品id */
    goodId?: number;
    /** 对应的独立站点id */
    shopSiteId?: number;
    /** 独立站点商品Id */
    shopSiteGoodId?: string;
    /** 对应的站群id */
    webSiteId?: number;
    /** 商品封面图 */
    faceSrc?: string;
    /** 商品标题 */
    title?: string;
    /** 商品描述 */
    content?: string;
    /** seo标题 */
    seoTitle?: string;
    /** seo关键词 */
    seoKeyword?: string;
    /** seo描述 */
    seoDescription?: string;
    /** 商品原始标价 */
    basePrice?: number;
    /** 商品当前售价 */
    price?: number;
    /** 价格权重 */
    priceWeight?: number;
    /** 购买链接 */
    buyLink?: string;
    /** 分销购买链接 */
    distributionLink?: string;
    /** 类目id */
    goodCategoryId?: number;
    /** 库存 */
    stock?: number;
    /** 销量 */
    salesVolume?: number;
    /** 是否上架 */
    isShelves?: boolean;
    /** 是否热门 */
    isHot?: boolean;
    /** 品牌Id */
    brandId?: number;
    /** 评分 */
    scope?: number;
    tags?: FBGoodTag[];
    /** 属性键值对 */
    attributes?: FBGoodAttribute[];
    /** 商品轮播图片 */
    banners?: FBGoodBanner[];
  };

  type FBGoodAlbum = {
    /** 商品专辑Id */
    goodAlbumId?: number;
    /** 专辑名称 */
    albumName?: string;
    /** 专辑描述 */
    albumDescribe?: string;
    /** 是否私密 */
    isPrivate?: boolean;
    /** 站点Id */
    webSiteId?: number;
  };

  type FBGoodAttribute = {
    /** 商品属性名 */
    attributeName?: string;
    /** 商品属性值 */
    attributeValue?: string;
  };

  type FBGoodBanner = {
    /** 图片表的id */
    imageId?: number;
  };

  type FBGoodCategory = {
    /** 商品分类Id */
    goodCategoryId?: number;
    /** 商品分类名称 */
    categoryName?: string;
    /** 图片id */
    imageId?: number;
    /** 分类父级id */
    parentid?: number;
    /** 是否热门 */
    isHot?: boolean;
    /** 是否成人用品 */
    isAdult?: boolean;
  };

  type FBGoodPartition = {
    goodPartitionId?: number;
    /** 站群Id */
    webSiteId?: number;
    /** 分区名称 */
    partitionName?: string;
    /** 横向图片Id */
    horizontalImageId?: number;
    /** 纵向图片Id */
    verticalImageId?: number;
    /** 正方形图片Id */
    squareImageId?: number;
  };

  type FBGoodPost = {
    goodPostId?: number;
    goodTitle?: string;
    goodDescribe?: string;
    goodPrice?: number;
    goodLink?: string;
    goodBasePrice?: number;
    goodAlbumId?: number;
    content?: string;
    imageIds?: number[];
  };

  type FBGoodPostComment = {
    /** 评论Id */
    goodPostId?: number;
    /** 回复的评论 */
    replyCommentId?: number;
    /** 评论内容 */
    commentContent?: string;
  };

  type FBGoodPublic = {
    /** 商品id */
    pid?: string;
    /** 商品标题 */
    title?: string;
    /** 商品价格 */
    price?: string;
    /** 商品原始价格 */
    price_orgin?: string;
    /** 分类 */
    category?: string;
    /** 属性 */
    attribute?: string;
    /** 描述 */
    content?: string;
    /** 链接 */
    url?: string;
    /** 独立站名称 */
    merchant_name?: string;
    /** 独立站链接 */
    merchant_url?: string;
    /** 图片集合 */
    images?: string;
    /** 站点类型 */
    source_type?: string;
  };

  type FBGoodTag = {
    goodTagId?: number;
    tagName?: string;
    isHot?: boolean;
  };

  type FBHeadImage = {
    imageUrl?: string;
  };

  type FBId = {
    /** 通用参数id */
    id?: number;
  };

  type FBIds = {
    /** 通用参数id集合 */
    ids?: number[];
  };

  type FBImage = {
    /** 图片id */
    imageId?: number;
    /** 图片链接 */
    imgSrc?: string;
    /** 图片宽 */
    width?: number;
    /** 图片高 */
    height?: number;
    /** 图片大小 */
    size?: number;
    /** 图片hash值 */
    hash?: string;
  };

  type FBLogText = {
    filename?: string;
  };

  type FBPoster = {
    /** 广告Id */
    posterId?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 广告标题 */
    posterTitle?: string;
    /** 广告链接 */
    posterLink?: string;
    /** 图片Id */
    posterImageId?: number;
    /** 是否上线 */
    isOnline?: boolean;
  };

  type FBProvider = {
    providerId?: number;
    webSiteId?: number;
    providerAction?: number;
    providerLogoImageId?: number;
    providerClientId?: string;
    providerClientSecret?: string;
    providerCallbackPath?: string;
  };

  type FBRecoveryUserPwd = {
    tempKey?: string;
    password?: string;
  };

  type FBRegisterUser = {
    tempKey?: string;
    code?: string;
  };

  type FBReport = {
    /** 举报的数据类型 */
    objectType?: string;
    /** 举报的数据对象 */
    objectId?: number;
    /** 举报的内容 */
    content?: string;
  };

  type FBShopSite = {
    /** 站点id */
    shopSiteId?: number;
    /** 称呼 */
    shopSiteTitle?: string;
    /** 站点名称 */
    shopSiteName?: string;
    /** 站点描述 */
    describe?: string;
    /** 站点链接 */
    link?: string;
    /** 站点logoId */
    logoImageId?: number;
    /** 邮箱 */
    emails?: string[];
    /** 电话 */
    tels?: string[];
    /** 开通年限 */
    yearopened?: number;
    /** 星级评定 */
    starlevel?: number;
    /** 是否上线 */
    isonline?: boolean;
    /** 是否热门 */
    ishot?: boolean;
    /** 站点状态 */
    state?: number;
  };

  type FBShopSiteJoin = {
    /** 称呼 */
    title?: string;
    /** 站点名称 */
    name: string;
    /** 站点描述 */
    describe: string;
    /** 站点链接 */
    link: string;
    /** 联系邮箱 */
    email: string;
    /** 联系电话 */
    tel?: string;
  };

  type FBState = {
    ids?: number[];
    state?: boolean;
  };

  type FBSystemTool = {
    /** Id */
    systemToolId?: number;
    /** 系统配置项标识 */
    systemToolCode?: string;
    /** 系统配置项名称 */
    systemToolName?: string;
    /** 系统配置项值 */
    systemToolValue?: string;
  };

  type FBTask = {
    taskId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 任务唯一标识 */
    taskCode?: string;
    /** 每天执行次数 */
    executionCount?: number;
    /** 每次处理数据量 */
    processingCount?: number;
  };

  type FBUpdateUser = {
    headImageId?: number;
    nickName?: string;
    describe?: string;
  };

  type FBUpdateUserPassword = {
    userId?: number;
    password?: string;
  };

  type FBUserLogin = {
    /** 用户账号 */
    username?: string;
    /** 请输入用户密码 */
    password?: string;
  };

  type FBUserProvider = {
    userProviderId?: number;
    userId?: number;
    providerId?: number;
    providerUserId?: string;
    providerEmail?: string;
    providerPictureSrc?: string;
    providerNickName?: string;
    createTime?: string;
  };

  type FBUserUpdatePwd = {
    /** 旧密码 */
    oldpassword?: string;
    /** 新密码 */
    newpassword?: string;
  };

  type FBWebSite = {
    /** 站点id */
    webSiteId?: number;
    /** 站点名 */
    name?: string;
    /** slogan */
    slogan?: string;
    /** seo标题 */
    seoTitle?: string;
    /** seo关键词 */
    seoKeyword?: string;
    /** seo描述 */
    seoDescription?: string;
    /** 域名 */
    domain?: string;
    /** 描述 */
    describe?: string;
    /** 类目id */
    goodCategoryId?: number;
    /** 图片id */
    logoImageId?: number;
    /** 状态 */
    state?: number;
  };

  type FBWebSiteSetting = {
    /** 站点设置Id */
    webSiteSettingId?: number;
    /** 属性名称 */
    settingName?: string;
    /** 属性说明 */
    settingDescribe?: string;
  };

  type FBWebSiteSettingReceiver = {
    webSiteId?: number;
    webSiteSettingValues?: TBWebSiteSettingValue[];
  };

  type FBWebSiteSettingValue = {
    webSiteSettingValueId?: number;
    /** 站点设置属性Id */
    webSiteSettingId?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 站点设置值 */
    settingValue?: string;
  };

  type FilterStateEnum = 0 | 1 | -1;

  type getAccountGetEmailStateParams = {
    email?: string;
  };

  type getAccountGetProviderByActionParams = {
    providerActionName?: string;
  };

  type getAccountGetUserByAccountParams = {
    username?: string;
    password?: string;
  };

  type getAccountGetUserByEmailParams = {
    email?: string;
  };

  type getAccountGetUserByIdParams = {
    id?: number;
  };

  type getAccountGetUserByPhoneParams = {
    phoneCountry?: number;
    phoneNumber?: string;
  };

  type getAccountGetUserByVisotorIdParams = {
    visotorId?: string;
  };

  type getAccountGetUserProviderByUserIdParams = {
    providerAction?: string;
    providerUserId?: string;
  };

  type getAIGetAIPromptWordByIdParams = {
    id?: number;
  };

  type getAIGetAIPromptWordListParams = {
    /** 场景 */
    promptWordScenc?: AIPromptWordScencEnum;
    /** 内容 */
    promptContent?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getBrandGetBrandByIdParams = {
    id?: number;
  };

  type getBrandGetBrandListParams = {
    brandname?: string;
    page?: number;
    count?: number;
  };

  type getCrawlerGetAMZNItemCommentsAsyncParams = {
    page?: number;
    count?: number;
  };

  type getCrawlerGetDistributionGoodListParams = {
    goodKeyword?: string;
    /** 是否已入过库 */
    loadState?: FilterStateEnum;
    /** 是否成人 */
    isAdult?: FilterStateEnum;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getCrawlerGetRepliteGoodListParams = {
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
  };

  type getCrawlerGetRepliteKeywordParams = {
    page?: number;
    count?: number;
  };

  type getDataStatisticsGetDomainParams = {
    /** 追踪器ID */
    trackerId?: string;
  };

  type getDataStatisticsGetDomainV2Params = {
    /** 追踪器ID */
    trackerId?: string;
  };

  type getDataStatisticsGetSourceCountParams = {
    /** 时间范围类型 */
    rangeType?: string;
    /** 追踪器 ID */
    trackerId?: string;
    /** 域名 */
    domain?: string;
  };

  type getDataStatisticsGetSourceCountV2Params = {
    /** 时间范围类型 */
    rangeType?: string;
    /** 追踪器 ID */
    trackerId?: string;
    /** 域名 */
    domain?: string;
  };

  type getDataStatisticsGetStatsHourlyParams = {
    /** 时间范围类型 */
    rangeType?: string;
    /** 追踪器 ID */
    trackerId?: string;
    /** 域名 */
    domain?: string;
  };

  type getDataStatisticsGetStatsHourlyV2Params = {
    /** 时间范围类型 */
    rangeType?: string;
    /** 追踪器 ID */
    trackerId?: string;
    /** 域名 */
    domain?: string;
  };

  type getDataStatisticsGetTrackParams = {
    /** 账号名 */
    account?: string;
  };

  type getDataStatisticsGetTrackV2Params = {
    /** 账号名 */
    account?: string;
  };

  type getDataStatisticsGetVisitRecordsV2Params = {
    /** 追踪器 ID */
    trackerId?: string;
    /** 页码 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
  };

  type getDealsGetDealJoinListParams = {
    page?: number;
    count?: number;
  };

  type getDealsGetDealsByIdParams = {
    id?: number;
  };

  type getDealsGetDealsListParams = {
    dealsName?: string;
    brandId?: number;
    shelves?: FilterStateEnum;
    orderBy?: string;
    page?: number;
    count?: number;
  };

  type getDealsGetDealsListPublicParams = {
    /** 关键词 */
    keyword?: string;
    /** 是否热门 */
    isHot?: boolean;
    /** 独立站点Id */
    shopSiteId?: number;
    /** 分页 */
    page?: number;
    /** 行数 */
    count?: number;
  };

  type getFriendLinkGetFriendLinkByIdParams = {
    id?: number;
  };

  type getFriendLinkGetFriendLinkListParams = {
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodAlbumByIdParams = {
    id?: number;
  };

  type getGoodAlbumGetGoodAlbumListParams = {
    albumName?: string;
    userId?: number;
    userName?: string;
    nickName?: string;
    keyWord?: string;
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodAlbumListPublicParams = {
    userId?: number;
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodPostByIdParams = {
    id?: number;
  };

  type getGoodAlbumGetGoodPostLikeByIdParams = {
    id?: number;
  };

  type getGoodAlbumGetGoodPostListByDiscoverParams = {
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getGoodAlbumGetGoodPostListByFollowParams = {
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodPostListByLikeParams = {
    userId?: number;
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodPostListForAlbumIdParams = {
    goodAlbumId?: number;
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodPostListParams = {
    goodPostId?: number;
    goodAlbumId?: number;
    goodTitle?: string;
    goodDescribe?: string;
    content?: string;
    keyWord?: string;
    isHot?: boolean;
    userId?: number;
    privateState?: FilterStateEnum;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getGoodAlbumGetGoodPostNextByIdParams = {
    id?: number;
  };

  type getGoodAlbumGetGoodPostUpByIdParams = {
    id?: number;
  };

  type getGoodGetGoodByIdParams = {
    id?: number;
  };

  type getGoodGetGoodCategoryByIdParams = {
    id?: number;
  };

  type getGoodGetGoodCategoryListParams = {
    isadult?: boolean;
    /** 父类Id */
    parentId?: number;
    /** 页数 */
    page?: number;
    /** 行数 */
    count?: number;
  };

  type getGoodGetGoodCategoryListParentParams = {
    parentId?: number;
  };

  type getGoodGetGoodListParams = {
    /** 商品标题 */
    title?: string;
    /** 店铺Id */
    shopSiteId?: number;
    /** 店铺名称 */
    shopSiteName?: string;
    /** 站群名称 */
    webSiteName?: string;
    /** 热门状态 */
    hotState?: FilterStateEnum;
    /** 是否成人状态 */
    adultState?: FilterStateEnum;
    /** AI是否处理完成状态 */
    aiOverState?: FilterStateEnum;
    /** 要排除不查询的商品id */
    filterGoodIds?: number[];
    /** 关键词（会查多个字段组合） */
    keyWord?: string;
    /** 标签Id */
    tagId?: number;
    /** 标签名称 */
    tagName?: string;
    /** 分类Id */
    categoryId?: number;
    /** 分类名称 */
    categoryName?: string;
    /** 品牌Id */
    brandId?: number;
    /** 品牌名称 */
    brandName?: string;
    /** 上下架状态 */
    shelvesState?: FilterStateEnum;
    /** 是否包含成人 */
    isAdult?: boolean;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
    /** 排序 */
    orderBy?: string;
  };

  type getGoodGetGoodListPublicParams = {
    /** 关键词（会查多个字段组合） */
    keyWord?: string;
    /** 标签Id */
    tagId?: number;
    /** 标签名称 */
    tagName?: string;
    /** 分类Id */
    categoryId?: number;
    /** 分类名称 */
    categoryName?: string;
    /** 品牌Id */
    brandId?: number;
    /** 品牌名称 */
    brandName?: string;
    /** 上下架状态 */
    shelvesState?: FilterStateEnum;
    /** 是否包含成人 */
    isAdult?: boolean;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getGoodGetGoodPartitionByIdParams = {
    id?: number;
  };

  type getGoodGetGoodPartitionListParams = {
    /** 分区名称 */
    partitionName?: string;
    /** 站点名称 */
    webSiteName?: string;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
    /** 排序 */
    orderBy?: string;
  };

  type getGoodGetGoodTagListParams = {
    page?: number;
    count?: number;
  };

  type getGoodPostCommentGetGoodPostCommentByIdParams = {
    id?: number;
  };

  type getGoodPostCommentGetGoodPostCommentListAndChildParams = {
    /** 帖子Id */
    goodPostId?: number;
    /** 页数 */
    page?: number;
    /** 行数 */
    count?: number;
    /** 每条父评论的子评论数量 */
    childCount?: number;
  };

  type getGoodPostCommentGetGoodPostCommentListParams = {
    /** 评论内容 */
    CommentContent?: string;
    /** 用户Id */
    UserId?: number;
    /** 帖子Id */
    GoodPostId?: number;
    /** 父评论Id */
    ParentCommentId?: number;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getImageGetImageListParams = {
    page?: number;
    count?: number;
  };

  type getLogGetLogListParams = {
    /** 日志类型，1=事务，2=警告，3=错误 */
    logType?: LogTypeEnum;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getLogGetTextLogDetailsParams = {
    filename?: string;
  };

  type getLogGetUserLogListParams = {
    page?: number;
    count?: number;
  };

  type getPosterGetPosterByIdParams = {
    id?: number;
  };

  type getPosterGetPosterListParams = {
    page?: number;
    count?: number;
  };

  type getShopSiteGetShopSiteByIdParams = {
    id?: number;
  };

  type getShopSiteGetShopSiteListParams = {
    /** 站点名 */
    shopSiteName?: string;
    page?: number;
    count?: number;
  };

  type getShopSiteGetShopSiteListPublicParams = {
    /** 关键词 */
    keyword?: string;
    page?: number;
    count?: number;
  };

  type getSystemGetSystemToolByIdParams = {
    id?: number;
  };

  type getSystemGetSystemToolListParams = {
    page?: number;
    count?: number;
  };

  type getSystemGetTaskByIdParams = {
    id?: number;
  };

  type getSystemGetTaskListParams = {
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getUserCheckEmailExistsParams = {
    email?: string;
  };

  type getUserGetProviderByIdParams = {
    /** 用户关联第三方平台 ID */
    id?: number;
  };

  type getUserGetUserFollowListParams = {
    userId?: number;
    keyWord?: string;
    /** true=关注列表，false=粉丝列表 */
    isFollowing?: boolean;
    page?: number;
    count?: number;
  };

  type getUserGetUserForPublicParams = {
    userId?: number;
  };

  type getUserGetUserListParams = {
    nickName?: string;
    userName?: string;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getUserGetUserProviderByIdParams = {
    /** 用户关联第三方平台的ID */
    id?: number;
  };

  type getUserGetUserProviderListParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    count?: number;
  };

  type getWebSiteGetWebSiteByIdParams = {
    id?: number;
  };

  type getWebSiteGetWebSiteListParams = {
    page?: number;
    count?: number;
  };

  type getWebSiteGetWebSiteSettingListParams = {
    page?: number;
    count?: number;
  };

  type getWebSiteGetWebSiteSettingParams = {
    id?: number;
  };

  type getWebSiteGetWebSiteSettingValueListParams = {
    /** 项名称 */
    webSiteSettingName?: string;
    /** 通用对象Id */
    Id?: number;
    /** 站点Id */
    webSiteId?: number;
    /** 用户Id */
    loginUserId?: number;
    'loginUser.UserId'?: number;
    'loginUser.Role'?: UserRoleEnum;
    'loginUser.UserName'?: string;
    'loginUser.VisotorId'?: string;
    /** 查询页数 */
    page?: number;
    /** 查询行数 */
    count?: number;
  };

  type getWebSiteGetWebSiteSettingValueParams = {
    /** 站点设置值ID */
    id?: number;
  };

  type getWebSiteGetWebSiteSettingValuePublicParams = {
    webSiteId?: number;
  };

  type LogTypeEnum = 1 | 2 | 3;

  type postUserGetProviderListParams = {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    count?: number;
  };

  type ProviderActionEnum = 1;

  type QUKeyWords = {
    keyWords?: string[];
  };

  type REWebApiCallback = {
    msg?: string;
    code?: number;
    data?: any;
    /** 额外备用参数 */
    remark?: Record<string, any>;
  };

  type TBAIPromptWord =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 提示词Id */
      aiPromptWordId?: number;
      /** 提示词名称 */
      promptWordContent?: string;
      promptWordScenc?: AIPromptWordScencEnum;
      /** 提示词场景名称 */
      promptWordScencName?: string;
    };

  type TBBrand =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 品牌Id */
      brandId?: number;
      /** 关联的分类Id */
      goodCategoryId?: number;
      /** 品牌名称 */
      brandName?: string;
      /** 品牌描述 */
      brandDescribe?: string;
      /** 品牌Logo对应的图片ID */
      logoImageId?: number;
      logoImage?: TBImage;
      /** 品牌Logo背景颜色 */
      logoImageBackground?: string;
      /** 是否上线 */
      isOnline?: boolean;
      /** 是否上线 */
      isHot?: boolean;
      /** 上热门时间 */
      hotTime?: string;
      /** 品牌总商品数 */
      goodCount?: number;
    };

  type TBDealJoin =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 优惠券提交表ID（主键、自增） */
      dealJoinId?: number;
      /** 所属站点链接 */
      webSiteLink?: string;
      offerType?: DealOfferTypeEnum;
      /** 券码 */
      dealCode?: string;
      /** 优惠说明 */
      discountDescription?: string;
      /** 过期时间 */
      expirationTime?: string;
      /** 电子邮件 */
      email?: string;
    };

  type TBDeals =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 优惠券ID */
      dealsId?: number;
      /** 对应的独立站Id */
      shopSiteId?: number;
      shopSite?: TBShopSite;
      /** 品牌Id */
      brandId?: number;
      brand?: TBBrand;
      /** 优惠券名称 */
      dealsName?: string;
      /** 优惠券码 */
      dealsCode?: string;
      /** 图片ID */
      imageId?: number;
      image?: TBImage;
      /** 最小金额 */
      minAmount?: number;
      /** 最小数量 */
      minCount?: number;
      /** 优惠券金额 */
      dealsAmount?: number;
      /** 优惠券折扣 */
      dealsDiscount?: number;
      dealsType?: DealsTypeEnum;
      /** 优惠券类型名称 */
      dealsTypeName?: string;
      /** 开始时间 */
      startTime?: string;
      /** 结束时间 */
      endTime?: string;
      expireType?: DealsExpireTypeEnum;
      /** 优惠券过期时间类型名称 */
      expireTypeName?: string;
      /** 过期天数 */
      expireDay?: number;
      /** 优惠券备注 */
      dealsNote?: string;
      /** 浏览次数 */
      browserCount?: number;
      /** 单击次数 */
      clickCount?: number;
      /** 是否上架 */
      isShelves?: boolean;
      /** 是否上热门 */
      isHot?: boolean;
      /** 上热门时间 */
      hotTime?: string;
    };

  type TBFriendLink =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 友情链接Id */
      friendLinkId?: number;
      /** 站点Id */
      webSiteId?: number;
      /** 链接名称 */
      friendName?: string;
      /** 友情链接 */
      friendLink?: string;
      /** 友情链接Logo图片Id */
      logoImageId?: number;
      logoImage?: TBImage;
    };

  type TBGood =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 商品Id */
      goodId?: number;
      /** 对应的独立站Id */
      shopSiteId?: number;
      shopSite?: TBShopSite;
      /** 对应的品牌Id */
      brandId?: number;
      brand?: TBBrand;
      /** 对应的站群Id */
      webSiteId?: number;
      webSite?: TBWebSite;
      /** 对应的独立站商品Id */
      shopSiteGoodId?: string;
      /** 商品封面图 */
      faceSrc?: string;
      /** 商品标题 */
      title?: string;
      /** 清理后的商品标题 */
      clearTitle?: string;
      /** 商品描述 */
      content?: string;
      /** Seo标题 */
      seoTitle?: string;
      /** Seo关键词 */
      seoKeyword?: string;
      /** Seo描述 */
      seoDescription?: string;
      /** 商品原始标价 */
      basePrice?: number;
      /** 商品当前售价 */
      price?: number;
      /** 价格权重 */
      priceWeight?: number;
      /** 购买链接 */
      buyLink?: string;
      /** 分销购买链接 */
      distributionLink?: string;
      /** 类目Id */
      goodCategoryId?: number;
      goodCategory?: TBGoodCategory;
      /** 库存 */
      stock?: number;
      /** 销量 */
      salesVolume?: number;
      /** 是否上架 */
      isShelves?: boolean;
      /** 是否AI已处理完 */
      isAIOver?: boolean;
      /** AI处理完成时间 */
      aiOverTime?: string;
      /** 是否热门 */
      isHot?: boolean;
      /** 上热门时间 */
      hotTime?: string;
      /** 支持数量 */
      topCount?: number;
      /** 反对数量 */
      downCount?: number;
      /** 浏览数量 */
      browseCount?: number;
      /** 点击数量 */
      clickCount?: number;
      /** 评论数量 */
      commentCount?: number;
      /** 评分 */
      scope?: number;
      /** 商品轮播图片 */
      banners?: TBGoodBannerMap[];
      /** 商品标签 */
      tags?: TBGoodTagMap[];
      /** 属性值 */
      attributes?: TBGoodAttribute[];
      /** 最后更新时间 */
      updateTime?: string;
    };

  type TBGoodAlbum =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 专辑ID */
      goodAlbumId?: number;
      /** 所属站点Id */
      webSiteId?: number;
      /** 用户ID */
      userId?: number;
      user?: TBUser;
      /** 专辑名称 */
      albumName?: string;
      /** 专辑描述 */
      albumDescribe?: string;
      /** 是否私密 */
      isPrivate?: boolean;
      /** 商品数量 */
      goodCount?: number;
      /** 最后一次收集时间 */
      lastCollectTime?: string;
      /** 修改时间 */
      updateTime?: string;
    };

  type TBGoodAttribute =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 属性Id */
      goodAttributeId: number;
      /** 商品Id */
      goodId: number;
      /** 属性名称 */
      attributeName: string;
      /** 属性值 */
      attributeValue: string;
    };

  type TBGoodBannerMap =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 产品轮播图Id */
      goodBannerMapId?: number;
      /** 轮播图片Id */
      imageId?: number;
      image?: TBImage;
      /** 产品Id */
      goodId?: number;
    };

  type TBGoodCategory =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 分类Id */
      goodCategoryId: number;
      /** 属性名称 */
      categoryName: string;
      /** 父类属性Id */
      parentId?: number;
      /** 分类图标 */
      imageId?: number;
      image?: TBImage;
      /** 商品数量 */
      goodCount?: number;
      /** 是否热门 */
      isHot?: boolean;
      /** 是否成人用品 */
      isAdult?: boolean;
      /** 上热门时间 */
      hotTime?: string;
      /** 子分类集合 */
      childs?: TBGoodCategory[];
    };

  type TBGoodPartition =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 商品分区Id */
      goodPartitionId?: number;
      /** 对应站点 */
      webSiteId?: number;
      webSite?: TBWebSite;
      /** 分区名称 */
      partitionName?: string;
      /** 横向图片Id */
      horizontalImageId?: number;
      horizontalImage?: TBImage;
      /** 纵向图片Id */
      verticalImageId?: number;
      verticalImage?: TBImage;
      /** 正方形图片Id */
      squareImageId?: number;
      squareImage?: TBImage;
    };

  type TBGoodPost =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 商品帖子Id */
      goodPostId?: number;
      /** 帖子列表中的标题 */
      postTitle?: string;
      /** 用户Id */
      userId?: number;
      user?: TBUser;
      /** 专辑Id */
      goodAlbumId?: number;
      goodAlbum?: TBGoodAlbum;
      /** 商品标题 */
      goodTitle?: string;
      /** 商品描述 */
      goodDescribe?: string;
      /** 商品价格 */
      goodPrice?: number;
      /** 商品划线价 */
      goodBasePrice?: number;
      /** 商品链接 */
      goodLink?: string;
      /** 帖子内容 */
      content?: string;
      /** 图片列表 */
      goodPostImages?: TBGoodPostImage[];
      /** 是否热门 */
      isHot?: boolean;
      /** 上热门时间 */
      hotTime?: string;
      /** 点赞数 */
      likeCount?: number;
      /** 评论数 */
      commentCount?: number;
      /** 分享数 */
      shareCount?: number;
      /** 是否用户like了 */
      isUserLike?: boolean;
      /** 前端展示的时间 */
      showTime?: string;
    };

  type TBGoodPostComment =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** Id */
      goodPostCommentId?: number;
      /** 帖子Id */
      goodPostId?: number;
      /** 用户Id */
      userId?: number;
      user?: TBUser;
      /** 评论内容 */
      commentContent?: string;
      /** 父级评论ID */
      parentCommentId?: number;
      /** 回复的评论Id */
      replyCommentId?: number;
      /** 回复的评论用户id，冗余字段，用于查询用户数据 */
      replyUserId?: number;
      replyUser?: TBUser;
      /** 点赞数 */
      likeCount?: number;
      /** 子评论数量 */
      childCount?: number;
      /** 子评论 */
      childComments?: TBGoodPostComment[];
      /** 当前用户是否点赞 */
      isLike?: boolean;
    };

  type TBGoodPostImage =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 商品帖子图片ID */
      goodPostImageId?: number;
      /** 帖子 ID */
      goodPostId?: number;
      /** 图片 ID */
      imageId?: number;
      image?: TBImage;
    };

  type TBGoodPostLike =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 商品帖子喜欢 ID */
      goodPostLikeId?: number;
      /** 帖子 ID */
      goodPostId?: number;
      goodPost?: TBGoodPost;
      /** 用户 ID */
      userId?: number;
    };

  type TBGoodTag =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 标签Id */
      goodTagId: number;
      /** 标签名 */
      tagName: string;
      /** 商品数量 */
      goodCount?: number;
      /** 是否热门 */
      isHot?: boolean;
      /** 上热门时间 */
      hotTime?: string;
    };

  type TBGoodTagMap =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 商品标签映射Id */
      goodTagMapId: number;
      /** 商品Id */
      goodId?: number;
      /** 商品标签Id */
      goodTagId?: number;
      goodTag?: TBGoodTag;
    };

  type TBImage =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 图片Id */
      imageId?: number;
      /** 图片链接 */
      imgSrc?: string;
      /** 图片宽 */
      width?: number;
      /** 图片高 */
      height?: number;
      /** 图片大小 */
      size?: number;
      /** 图片Hash值 */
      hash?: string;
    };

  type TBLog =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 日志Id */
      logId?: number;
      logType?: LogTypeEnum;
      /** 日志类型名称 */
      logTypeName?: string;
      /** 日志内容 */
      logData?: string;
    };

  type TBPoster =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 广告Id */
      posterId?: number;
      /** 所属站群Id */
      webSiteId?: number;
      /** 标题 */
      posterTitle?: string;
      /** 跳转链接 */
      posterLink?: string;
      /** 图片Id */
      posterImageId?: number;
      posterImage?: TBImage;
      /** 是否上线 */
      isOnline?: boolean;
      /** 单击次数 */
      clickCount?: number;
    };

  type TBProvider =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 第三方平台ID */
      providerId?: number;
      /** 对应的站点ID */
      webSiteId?: number;
      providerAction?: ProviderActionEnum;
      /** 第三方平台名称 */
      providerActionName?: string;
      /** 第三方平台Logo图片ID */
      providerLogoImageId?: number;
      providerLogoImage?: TBImage;
      /** 第三方平台 ClientId */
      providerClientId?: string;
      /** 第三方平台 ClientSecret */
      providerClientSecret?: string;
      /** 第三方平台回调地址 */
      providerCallbackPath?: string;
    };

  type TBShopSite =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 站点Id */
      shopSiteId?: number;
      /** 站点名称 */
      shopSiteName?: string;
      /** 清理后的站点名称 */
      clearShopSiteName?: string;
      /** 站点称呼 */
      shopSiteTitle?: string;
      /** 站点描述 */
      describe?: string;
      /** 站点链接 */
      link?: string;
      /** 站点类型 */
      siteType?: string;
      /** 站点Logo */
      logoImageId?: number;
      logoImage?: TBImage;
      /** 邮箱 */
      emailsStr?: string;
      /** 邮箱集合 */
      emails?: string[];
      /** 电话 */
      telsStr?: string;
      /** 电话集合 */
      tels?: string[];
      /** 开通年限 */
      yearOpened?: number;
      /** 星级评定 */
      starLevel?: number;
      /** 是否上线 */
      isOnline?: boolean;
      /** 是否上线 */
      isHot?: boolean;
      /** 上热门时间 */
      hotTime?: string;
      /** 站点总商品数 */
      goodCount?: number;
      /** 站点状态 */
      state?: number;
      /** 最后更新时间 */
      updateTime?: string;
    };

  type TBSystemTool =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 系统配置项ID */
      systemToolId?: number;
      /** 系统配置项标识 */
      systemToolCode?: string;
      /** 系统配置项名称 */
      systemToolName?: string;
      /** 系统配置项值 */
      systemToolValue?: string;
    };

  type TBTask =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 任务ID */
      taskId?: number;
      /** 任务名称 */
      taskName?: string;
      /** 任务唯一标识 */
      taskCode?: string;
      /** 每天执行次数 */
      executionCount?: number;
      /** 每次处理数据量 */
      processingCount?: number;
      /** 总执行次数 */
      totalCount?: number;
      /** 总执行次数 */
      isOpen?: boolean;
    };

  type TBUser =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 用户ID */
      userId?: number;
      /** 归属的站群Id */
      webSiteId?: number;
      webSite?: TBWebSite;
      /** 用户名 */
      userName?: string;
      /** 昵称 */
      nickName?: string;
      /** 描述 */
      describe?: string;
      /** 邮箱 */
      email?: string;
      /** 邮箱是否验证了 */
      isEmailCheck?: boolean;
      /** 手机区号 */
      phoneCountry?: number;
      /** 手机号 */
      phoneNumber?: string;
      /** 头像ID */
      headImageId?: number;
      headImage?: TBImage;
      userRole?: UserRoleEnum;
      /** 客户端唯一标识 */
      visotor?: string;
      /** 用户角色名称 */
      userRoleName?: string;
      /** 粉丝数量 */
      followerCount?: number;
      /** 关注数量 */
      followingCount?: number;
      /** 帖子数量 */
      postCount?: number;
      /** Like数量 */
      likeCount?: number;
      /** 是否虚拟账号 */
      isVirtual?: boolean;
      /** 修改时间 */
      updateTime?: string;
      /** 是否关注了 */
      isFollow?: boolean;
      /** 帖子列表，反向导航 */
      goodPosts?: TBGoodPost[];
    };

  type TBUserFollow =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 用户关注Id */
      userFollowId?: number;
      /** 用户Id */
      userId?: number;
      user?: TBUser;
      /** 关注用户Id */
      followUserId?: number;
      followUser?: TBUser;
    };

  type TBUserLog =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 用户日志Id */
      userLogId?: number;
      /** 用户Id */
      userId?: number;
      /** 用户事件 */
      eventData?: string;
      /** 补充说明 */
      note?: string;
    };

  type TBUserProvider =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 用户关联ID */
      userProviderId?: number;
      /** 用户ID */
      userId?: number;
      /** 第三方平台 */
      providerId?: number;
      provider?: TBProvider;
      /** 第三方平台用户ID */
      providerUserId?: string;
      /** 第三方平台邮箱 */
      providerEmail?: string;
      /** 第三方平台用户头像 */
      providerPictureSrc?: string;
      /** 第三方平台用户昵称 */
      providerNickName?: string;
      /** 第三方登录的Access Token */
      accessToken?: string;
      /** 第三方登录的Refresh Token */
      refreshToken?: string;
      /** Access Token的过期时间 */
      tokenExpiration?: string;
      /** 修改时间 */
      updateTime?: string;
    };

  type TBWebSite =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 站点Id */
      webSiteId?: number;
      /** 站点名 */
      name?: string;
      /** slogan */
      slogan?: string;
      /** seo标题 */
      seoTitle?: string;
      /** seo关键词 */
      seoKeyword?: string;
      /** seo描述 */
      seoDescription?: string;
      /** 域名 */
      domain?: string;
      /** 描述 */
      describe?: string;
      /** 图片Id */
      logoImageId?: number;
      logoImage?: TBImage;
      /** 类目Id【用于垂直网站】 */
      goodCategoryId?: number;
      goodCategory?: TBGoodCategory;
      /** 状态 */
      state?: number;
      /** 最后更新时间 */
      updateTime?: string;
    };

  type TBWebSiteSetting =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 站点设置ID */
      webSiteSettingId?: number;
      /** 属性名称 */
      settingName?: string;
      /** 属性说明 */
      settingDescribe?: string;
    };

  type TBWebSiteSettingValue =
    // #/components/schemas/EntitiesBase
    EntitiesBase & {
      /** 站点设置值ID */
      webSiteSettingValueId?: number;
      /** 站点设置表ID */
      webSiteSettingId?: number;
      webSiteSetting?: TBWebSiteSetting;
      /** 站点设置表ID */
      webSiteId?: number;
      webSite?: TBWebSite;
      /** 站点设置值 */
      settingValue?: string;
    };

  type UserRoleEnum = 1 | 2 | 3;
}
