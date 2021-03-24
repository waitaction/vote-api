/**
 * 响应结果状态
 */
export enum ResponseCodeEnum {
    /**
     * 成功
     */
    SUCCESS = 0,
    /**
     * 失败
     */
    FAIL = -1,
    /**
     * 错误
     */
    ERROR = -2,
    /**
     * 投票未开始
     */
    VOTE_NOT_BEGIN = -3,
    /**
     * 投票已结束
     */
    VOTE_END = -4,


}