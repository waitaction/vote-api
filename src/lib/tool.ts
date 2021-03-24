/**
 * 常用工具类
 */
export class Tool {

    /**
      * 自定义格式为时间字符串
      * @param   datetime 时间
      * @param  format 格式化时间的字符串，例如 yyyy-MM-dd HH:mm:ss
      * @returns  返回已格式化的时间字符串
      */
    static formatDate(datetime: Date, format: string): string {

        function formatNumber(n: string, fmt: string) {
            n = n + '';
            if (fmt.length > n.length) {
                return fmt.substring(n.length) + n;
            }
            return n;
        }

        const cfg: any = {
            MMM: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            MMMM: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        };
        const values: any = {
            y: datetime.getFullYear(),
            M: datetime.getMonth() + 1,
            d: datetime.getDate(),
            H: datetime.getHours(),
            m: datetime.getMinutes(),
            s: datetime.getSeconds(),
            S: datetime.getMilliseconds()
        };
        /*用正则表达式拆分日期格式各个元素*/
        const elems = format.match(/y+|M+|d+|H+|m+|s+|S+|[^yMdHmsS]/g);
        // 将日期元素替换为实际的值
        for (let i = 0; i < elems.length; i++) {
            if (cfg[elems[i]]) {
                elems[i] = cfg[elems[i]][values[elems[i].charAt(0)]];
            } else if (values[elems[i].charAt(0)] >= 0) {
                elems[i] = formatNumber(values[elems[i].charAt(0)], elems[i].replace(/./g, '0'));
            }
        }
        return elems.join('');
    }

    /**
     * 生成伪guid
     */
    static uuid(): string {
        let s: any[] = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        // tslint:disable-next-line:no-bitwise
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid = s.join("");
        return uuid;
    }
    /**
     * 空guid
     */
    static emptyUUID(): string {
        return "00000000-0000-0000-0000-000000000000";
    }
    /** 
     * 测试是否是GUID 
     */
    static testUUID(uuid: string): boolean {
        // tslint:disable-next-line:max-line-length
        let regExp = new RegExp("^\\w\\w\\w\\w\\w\\w\\w\\w-\\w\\w\\w\\w-\\w\\w\\w\\w-\\w\\w\\w\\w-\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w$", "gi");
        if (!regExp.test(uuid)) {
            return false;
        }
        return true;
    }
    /**
     * 验证手机号是否为正确号码
     */
    static validatePhone(phone: string): boolean {
        return /^1[3|4|5|7|8]\d{9}$/.test(phone);
    }
    /**
     * 验证身份证号是否为香港身份证号
     */
    static validateIdCardHk(idCard: string): boolean {
        return /^[A-Z]\d{6}\(\d\)$/.test(idCard);
    }

    /**
     * 验证是否正确的邮箱
     * @param email 邮箱
     */
    static validateMail(email: string): boolean {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    }
    /**克隆对像
     * @param obj
     */
    static clone<T>(obj: T): T {
        let o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (let i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    // tslint:disable-next-line:forin
                    for (let j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }

        } else {
            o = obj;
        }
        return o;
    }


    /**
     * 对像映射
     * @param {T} fromObj 对像源
     * @param {T} targetObj 映射目标
     */
    static mapObject<T>(fromObj: T, targetObj: T): void {
        if (typeof fromObj === "object") {
            if (fromObj === null) {
                throw new Error("映射源不能为空值");
            } else {
                // tslint:disable-next-line:forin
                for (let j in fromObj) {
                    targetObj[j] = fromObj[j];
                }
            }
        } else {
            throw new Error("映射源不是一个引用对像");
        }
    }

    /**
     * 合并数组 
     * */
    static arrayCombine<T>(sourceArray: Array<T>, torgetArray: Array<T>): Array<T> {
        try {
            // tslint:disable-next-line:variable-name
            let _sourceArray: Array<T> = this.clone(sourceArray);
            // tslint:disable-next-line:variable-name
            let _torgetArray: Array<T> = this.clone(torgetArray);
            if (sourceArray != null && sourceArray.length > 0 && torgetArray != null && torgetArray.length > 0) {
                for (let index = 0; index < _torgetArray.length; index++) {
                    let item = _torgetArray[index];
                    _sourceArray.push(item);
                }
                return _sourceArray;
            } else if (sourceArray != null && sourceArray.length > 0) {
                return _sourceArray;
            } else {
                return _torgetArray;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    /**
     * 移除数组中的项
     * @param arr 数组
     * @param item 数组中的项
     */
    static removeItem<T>(arr: Array<T>, item: T): boolean {
        if (arr != null) {
            arr.splice(arr.indexOf(item), 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 加密字符串
     * @param str 字符串
     */
    static encrypt(str): string {  //加密字符串
        //定义密钥，36个字母和数字
        let key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //var 1 = key.length;  //获取密钥的长度
        let a = key.split("");  //把密钥字符串转换为字符数组
        let s = "";
        let b;
        let b1;
        let b2;
        let b3;  //定义临时变量
        for (let i = 0; i < str.length; i++) {  //遍历字符串
            b = str.charCodeAt(i);  //逐个提取每个字符，并获取Unicode编码值
            b1 = b % 1;  //求Unicode编码值得余数
            b = (b - b1) / 1;  //求最大倍数
            b2 = b % 1;  //求最大倍数的于是
            b = (b - b2) / 1;  //求最大倍数
            b3 = b % 1;  //求最大倍数的余数
            s += a[b3] + a[b2] + a[b1];  //根据余数值映射到密钥中对应下标位置的字符
        }
        return s;  //返回这些映射的字符
    }

    /**
     * 解密字符串
     * @param str 要解密的字符串
     */
    static decrypt(str): string {
        //定义密钥，36个字母和数字
        let key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //let 1 = key.length;  //获取密钥的长度
        let b;
        let b1;
        let b2;
        let b3;
        let d = 0;
        let s;  //定义临时变量
        s = new Array(Math.floor(str.length / 3));  //计算加密字符串包含的字符数，并定义数组
        b = s.length;  //获取数组的长度
        for (let i = 0; i < b; i++) {  //以数组的长度循环次数，遍历加密字符串
            b1 = key.indexOf(str.charAt(d));  //截取周期内第一个字符串，计算在密钥中的下标值
            d++;
            b2 = key.indexOf(str.charAt(d));  //截取周期内第二个字符串，计算在密钥中的下标值
            d++;
            b3 = key.indexOf(str.charAt(d));  //截取周期内第三个字符串，计算在密钥中的下标值
            d++;
            s[i] = b1 * 1 * 1 + b2 * 1 + b3;  //利用下标值，反推被加密字符的Unicode编码值
        }
        b = String.fromCharCode(s.join(','));
        return b;  //返回被解密的字符串
    }
}
