class TimeUtils {
    /**
     * 格式化时间戳/Date对象为指定格式
     * @param {Date|number} date 
     * @param {string} format 格式字符串（支持YYYY/MM/DD/HH/mm/ss）
     * @returns {string} 格式化后的时间字符串
     */
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) throw new Error('Invalid date');
  
      const pad = (n) => n.toString().padStart(2, '0');
      return format
        .replace('YYYY', d.getFullYear())
        .replace('MM', pad(d.getMonth() + 1))
        .replace('DD', pad(d.getDate()))
        .replace('HH', pad(d.getHours()))
        .replace('mm', pad(d.getMinutes()))
        .replace('ss', pad(d.getSeconds()));
    }
  
    /**
     * 计算两个时间的差值
     * @param {Date|number} start 
     * @param {Date|number} end 
     * @param {string} unit 返回单位（ms/s/m/h/d，默认ms）
     * @returns {number} 时间差值
     */
    static difference(start, end, unit = 'ms') {
      const startDate = new Date(start).getTime();
      const endDate = new Date(end).getTime();
      const diff = Math.abs(endDate - startDate);
  
      const units = {
        ms: diff,
        s: diff / 1000,
        m: diff / 1000 / 60,
        h: diff / 1000 / 60 / 60,
        d: diff / 1000 / 60 / 60 / 24
      };
  
      return Math.floor(units[unit] || diff);
    }
  
    /**
     * 时区转换（需要Node.js 10+）
     * @param {Date|number} date 
     * @param {string} targetTimeZone 时区标识符（如'Asia/Shanghai'）
     * @returns {string} 转换后的时间字符串
     */
    static convertTimeZone(date, targetTimeZone) {
      const options = {
        timeZone: targetTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
  
      return new Intl.DateTimeFormat('en-GB', options)
        .format(new Date(date))
        .replace(/\//g, '-')
        .replace(',', '');
    }
  
    /**
     * 验证时间格式有效性
     * @param {string} dateString 
     * @returns {boolean} 是否有效
     */
    static isValid(dateString) {
      return !isNaN(new Date(dateString).getTime());
    }
  
    /**
     * 生成时间范围数组
     * @param {Date} start 
     * @param {Date} end 
     * @param {number} step 步长（毫秒）
     * @returns {Date[]} 时间点数组
     */
    static generateRange(start, end, step = 3600000) {
      const dates = [];
      let current = new Date(start);
      const endTime = end.getTime();
  
      while (current.getTime() <= endTime) {
        dates.push(new Date(current));
        current = new Date(current.getTime() + step);
      }
  
      return dates;
    }
  }
  
  // 使用示例
  try {
    // 格式化时间
    console.log(TimeUtils.format(Date.now())); // 2025-05-22 14:30:00
    
    // 计算时间差
    const start = new Date();
    setTimeout(() => {
      console.log(TimeUtils.difference(start, Date.now(), 's')); // 输出2（秒）
    }, 2000);
  
    // 时区转换
    console.log(TimeUtils.convertTimeZone(Date.now(), 'Asia/Tokyo')); // 2025-05-22 23:30:00
  
    // 验证时间
    console.log(TimeUtils.isValid('2025-05-22')); // true
  
    // 生成时间范围
    const range = TimeUtils.generateRange(
      new Date('2025-05-22'),
      new Date('2025-05-23'),
      3600000 // 每小时
    );
    console.log(range.map(d => TimeUtils.format(d, 'YYYY-MM-DD HH:mm')));
  } catch (error) {
    console.error(error.message);
  }
  
  export default TimeUtils
