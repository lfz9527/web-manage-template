declare namespace API {
  type AIPromptWordScencEnum = 1 | 2;

  type FBAIPromptWord = {
    aIPromptWordId?: number;
    /** 设定的角色 */
    promptRole?: string;
    /** 提示词内容 */
    promptWordContent?: string;
    promptWordScenc?: AIPromptWordScencEnum;
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

  type FBCount = {
    count?: number;
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
    /** 关键词 */
    keyWord?: string;
    /** 是否已入过库 */
    loadState?: FilterStateEnum;
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

  type getGoodAlbumGetGoodPostListByFollowParams = {
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodPostListByLikeParams = {
    userId?: number;
    page?: number;
    count?: number;
  };

  type getGoodAlbumGetGoodPostListParams = {
    /** 关键词 */
    keyWord?: string;
    /** 商品标题 */
    goodTitle?: string;
    /** 商品描述 */
    goodDescribe?: string;
    /** 内容 */
    content?: string;
    /** 专辑Id */
    goodAlbumId?: number;
    /** 用户Id */
    userId?: number;
    page?: number;
    count?: number;
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
    page?: number;
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

  type REWebApiCallback = {
    msg?: string;
    code?: number;
    data?: any;
    /** 额外备用参数 */
    remark?: Record<string, any>;
  };

  type TBGoodCategory = {
    /** 创建时间 */
    createTime?: string;
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

  type TBImage = {
    /** 创建时间 */
    createTime?: string;
    /** 商品轮播Id */
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

  type TBWebSite = {
    /** 创建时间 */
    createTime?: string;
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

  type TBWebSiteSetting = {
    /** 创建时间 */
    createTime?: string;
    /** 站点设置ID */
    webSiteSettingId?: number;
    /** 属性名称 */
    settingName?: string;
    /** 属性说明 */
    settingDescribe?: string;
  };

  type TBWebSiteSettingValue = {
    /** 创建时间 */
    createTime?: string;
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
