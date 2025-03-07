declare namespace API {
  type FBBrand = {
    brandId?: number;
    goodCategoryId?: number;
    brandName?: string;
    brandDescribe?: string;
    logoImageId?: number;
    isOnline?: boolean;
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

  type FBCrawlerKeyword = {
    crawlerKeywordId?: number;
    keywordName?: string;
  };

  type FBCrawlerLog = {
    crawlerLogId?: number;
    crawlerKeywordId?: number;
    dataCount?: number;
    shopSiteId?: number;
  };

  type FBDealJoin = {
    dealJoinId?: number;
    webSiteLink?: string;
    offerType?: number;
    dealCode?: string;
    discountDescription?: string;
    expirationTime?: string;
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
    friendName?: string;
    friendLink?: string;
    logoImageId?: number;
  };

  type FBGood = {
    goodId?: number;
    shopSiteId?: number;
    shopSiteGoodId?: string;
    webSiteId?: number;
    faceSrc?: string;
    title?: string;
    content?: string;
    seoTitle?: string;
    seoKeyword?: string;
    seoDescription?: string;
    basePrice?: number;
    price?: number;
    priceWeight?: number;
    buyLink?: string;
    distributionLink?: string;
    goodCategoryId?: number;
    stock?: number;
    salesVolume?: number;
    isShelves?: boolean;
    isHot?: boolean;
    scope?: number;
    tags?: FBGoodTag[];
    attributes?: FBGoodAttribute[];
    banners?: FBGoodBanner[];
  };

  type FBGoodAlbum = {
    goodAlbumId?: number;
    albumName?: string;
    albumDescribe?: string;
    isPrivate?: boolean;
  };

  type FBGoodAttribute = {
    attributeName?: string;
    attributeValue?: string;
  };

  type FBGoodBanner = {
    imageId?: number;
  };

  type FBGoodCategory = {
    goodCategoryId?: number;
    categoryname?: string;
    imageId?: number;
    parentid?: number;
    isHot?: boolean;
    isAdult?: boolean;
  };

  type FBGoodPartition = {
    goodPartitionId?: number;
    webSiteId?: number;
    partitionName?: string;
    horizontalImageId?: number;
    verticalImageId?: number;
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
    goodPostId?: number;
    commentContent?: string;
  };

  type FBGoodPublic = {
    pid?: string;
    title?: string;
    price?: string;
    price_orgin?: string;
    category?: string;
    attribute?: string;
    content?: string;
    url?: string;
    merchant_name?: string;
    merchant_url?: string;
    images?: string;
    source_type?: string;
  };

  type FBGoodTag = {
    goodTagId?: number;
    tagName?: string;
    isHot?: boolean;
  };

  type FBHot = {
    ids?: number[];
    isHot?: boolean;
  };

  type FBId = {
    id?: number;
  };

  type FBIds = {
    ids?: number[];
  };

  type FBImage = {
    imageId?: number;
    imgSrc?: string;
    width?: number;
    height?: number;
    size?: number;
    hash?: string;
  };

  type FBLogText = {
    filename?: string;
  };

  type FBPoster = {
    posterId?: number;
    webSiteId?: number;
    posterTitle?: string;
    posterLink?: string;
    posterImageId?: number;
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
    objectType?: string;
    objectId?: number;
    content?: string;
  };

  type FBShelves = {
    ids?: number[];
    isShelves?: boolean;
  };

  type FBShopSite = {
    shopSiteId?: number;
    shopSiteTitle?: string;
    shopSiteName?: string;
    describe?: string;
    link?: string;
    logoImageId?: number;
    emails?: string[];
    tels?: string[];
    yearopened?: number;
    starlevel?: number;
    isonline?: boolean;
    ishot?: boolean;
    state?: number;
  };

  type FBShopSiteJoin = {
    title?: string;
    name: string;
    describe: string;
    link: string;
    email: string;
    tel?: string;
  };

  type FBState = {
    ids?: number[];
    state?: boolean;
  };

  type FBUserLogin = {
    username?: string;
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
    oldpassword?: string;
    newpassword?: string;
  };

  type FBWebSite = {
    webSiteId?: number;
    name?: string;
    slogan?: string;
    seoTitle?: string;
    seoKeyword?: string;
    seoDescription?: string;
    domain?: string;
    describe?: string;
    goodCategoryId?: number;
    logoImageId?: number;
    state?: number;
  };

  type FBWebSiteSetting = {
    webSiteSettingId?: number;
    settingName?: string;
    settingDescribe?: string;
  };

  type FBWebSiteSettingValue = {
    webSiteSettingValueId?: number;
    webSiteSettingId?: number;
    webSiteId?: number;
    settingValue?: string;
  };

  type FilterStateEnum = 0 | 1 | -1;

  type getBrandGetBrandByIdParams = {
    id?: number;
  };

  type getBrandGetBrandListParams = {
    brandname?: string;
    page?: number;
    count?: number;
  };

  type getCrawlerGetCrawlerKeywordByIdParams = {
    id?: number;
  };

  type getCrawlerGetCrawlerKeywordListParams = {
    keywordName?: string;
    orderBy?: string;
    page?: number;
    count?: number;
  };

  type getCrawlerGetCrawlerLogByIdParams = {
    id?: number;
  };

  type getCrawlerGetCrawlerLogListParams = {
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
    /** 专辑Id */
    goodAlbumId?: number;
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
    title?: string;
    orderBy?: string;
    webSiteId?: number;
    isShelves?: FilterStateEnum;
    page?: number;
    count?: number;
  };

  type getGoodGetGoodListPublicParams = {
    /** 关键词 */
    keyword?: string;
    /** 标签id */
    tagid?: number;
    /** 分类id */
    categoryid?: number;
    /** 分页 */
    page?: number;
    /** 行数 */
    count?: number;
  };

  type getGoodGetGoodPartitionByIdParams = {
    id?: number;
  };

  type getGoodGetGoodPartitionListParams = {
    /** 分区名 */
    partitionName?: string;
    /** 站点Id */
    webSiteId?: number;
    /** 排序 */
    orderBy?: string;
    /** 页数 */
    page?: number;
    /** 行数 */
    count?: number;
  };

  type getGoodGetGoodTagListParams = {
    page?: number;
    count?: number;
  };

  type getGoodPostCommentGetGoodPostCommentByIdParams = {
    id?: number;
  };

  type getGoodPostCommentGetGoodPostCommentListParams = {
    /** 帖子Id */
    goodPostId?: number;
    /** 用户Id */
    userId?: number;
    /** 帖子内容（模糊搜索） */
    commentContent?: string;
    /** 页数 */
    page?: number;
    /** 行数 */
    count?: number;
  };

  type getImageGetImageListParams = {
    page?: number;
    count?: number;
  };

  type getLogGetLogListParams = {
    page?: number;
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
    /** 页码，默认值为1 */
    page?: number;
    /** 每页数量，默认值为50 */
    count?: number;
  };

  type getWebSiteGetWebSiteSettingValueParams = {
    /** 站点设置值ID */
    id?: number;
  };

  type getWebSiteGetWebSiteSettingValuePublicParams = {
    webSiteId?: number;
  };

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
    remark?: Record<string, any>;
  };
}
