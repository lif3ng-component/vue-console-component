<template>
  <div :class="`${prefix}-date-picker`">
    <nq-input
      icon-before="calendar"
      v-model="formattedString"
      v-popper
      ref="input"
      :readonly="inputReadonly"
    />
    <div :class="`${prefix}-date-picker-popper`">
      <!-- <div>
        <span @click="viewType = 'year'">Y</span>
        <span @click="viewType = 'month'">M</span>
        <span @click="viewType = 'date'">D</span>
      </div> -->
      <div class="data-container">
        <div class="header-nav">
          <!-- 上一年 / 上几年 -->
          <component
            :is="`${prefix}-icon`"
            type="double-left"
            @click="viewType === 'year' ? preYears() : prepYear()"
          />
          <!-- 上一月 -->
          <component
            :is="`${prefix}-icon`"
            type="left"
            @click="prepMonth"
            v-if="showPrevNextMonth"
          />
          <div class="text">
            <span v-if="viewType === 'year'">{{
              years.length > 0 ? `${years[0]}-${years[years.length - 1]}` : ""
            }}</span>
            <template v-else>
              <span @click="viewType = 'year'">{{ year }}年</span>
              <span @click="viewType = 'month'" v-if="viewType !== 'month'"
                >{{ month }}月</span
              >
            </template>
          </div>
          <!-- 下一月 -->
          <component
            :is="`${prefix}-icon`"
            v-if="showPrevNextMonth"
            type="right"
            @click="nextMonth"
          />
          <!-- 下一年 / 下几年 -->
          <component
            :is="`${prefix}-icon`"
            type="double-right"
            @click="viewType === 'year' ? nextYears() : nextYear()"
          />
        </div>
        <table class="calendar-table" v-if="viewType === 'date'">
          <thead>
            <tr>
              <th v-for="(d, index) in dayList" :key="index">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wIndex) in weeksDate" :key="wIndex">
              <td
                v-for="({ text, value, value: { year, month, date } = {} },
                dIndex) in week"
                :key="dIndex"
                :class="{
                  disabled: !checkEnable(
                    new Date(year, month - 1, date),
                    'date'
                  ),
                  selected:
                    typeof date !== 'undefined' &&
                    `${year}-${month}-${date}` === selectedDate
                }"
                @click="
                  checkEnable(new Date(year, month - 1, date), 'date') &&
                    handleClick('date', value)
                "
              >
                {{ text }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="month-container" v-if="viewType === 'month'">
          <div
            class="month-item"
            v-for="({ text, value, value: { year, month } }, index) in months"
            :key="index"
            @click="
              checkEnable(new Date(year, month - 1), 'month') &&
                handleClick('month', value)
            "
            :class="{
              selected: `${year}-${month}` === selectedMonth,
              disabled: !checkEnable(new Date(year, month - 1), 'month')
            }"
          >
            {{ text }}
          </div>
        </div>
        <div class="year-container" v-if="viewType === 'year'">
          <div
            v-for="year in years"
            :key="year"
            @click="
              checkEnable(new Date(year, 0), 'year') &&
                handleClick('year', year)
            "
            :class="{
              selected: year === $data.year,
              disabled: !checkEnable(new Date(year, 0), 'year')
            }"
          >
            {{ year }}
          </div>
        </div>
      </div>
      <div class="time-container" v-if="showTimeContainer">
        <div class="hour-wrapper" ref="hour">
          <div
            v-for="({ text, enable, hash, value }, i) in hours"
            :key="i"
            @click="enable && handleClick('hour', value)"
            :class="{
              selected: hash === selectedHour,
              disabled: !enable
            }"
          >
            {{ text }}
          </div>
        </div>
        <div class="min-wrapper" ref="min">
          <div
            v-for="({ text, enable, hash, value }, i) in mins"
            :key="i"
            @click="enable && handleClick('min', value)"
            :class="{
              selected: hash === selectedMin,
              disabled: !enable
            }"
          >
            {{ text }}
          </div>
        </div>
        <div class="sec-wrapper" ref="sec">
          <div
            v-for="({ text, enable, hash, value }, i) in secs"
            :key="i"
            @click="enable && handleClick('sec', value)"
            :class="{
              selected: hash === selectedSec,
              disabled: !enable
            }"
          >
            {{ text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const wrapperZero = number => `${number < 10 ? 0 : ""}${number}`;
const toDate = d => (d instanceof Date ? d : new Date(d));
export default {
  name: "DatePicker",
  inject: {
    formAreaEmit: {
      default: ""
    }
  },
  model: {
    event: "input"
  },
  props: {
    value: {
      default: ""
    },
    initValue: {
      default: ""
    },
    type: {
      type: String,
      default: "sec"
    },
    max: {
      default: ""
    },
    min: {
      default: ""
    },
    valueFormat: {
      type: String,
      default: "timestamp"
    }
  },
  data() {
    const now = new Date();
    let initSelected = {
      year: undefined,
      month: undefined,
      date: undefined,
      hour: undefined,
      min: undefined,
      sec: undefined
    };
    const enableRules = [];
    const { min, max, initValue, value } = this.$props;
    // if (type === "month") {
    //   now.setDate(1);
    //   now.setHours(0);
    //   now.setMinutes(0);
    //   now.setSeconds(0);
    //   now.setMilliseconds(0);
    // }
    if (max) {
      enableRules.push(["<=", max === "now" ? now : toDate(max)]);
    }
    if (min) {
      enableRules.push([">=", min === "now" ? now : toDate(min)]);
    }
    const customValue = value || initValue;
    if (customValue) {
      const baseTime = customValue === "now" ? now : toDate(customValue);
      Object.assign(initSelected, {
        year: baseTime.getFullYear(),
        month: baseTime.getMonth() + 1,
        date: baseTime.getDate(),
        hour: baseTime.getHours(),
        min: baseTime.getMinutes(),
        sec: baseTime.getSeconds()
      });
    }
    const viewTypeMap = {
      min: "date",
      sec: "date"
    };
    return {
      enableRules,
      tippyInstance: null,

      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: "",
      hour: "",
      minute: "",
      dayList: ["日", "一", "二", "三", "四", "五", "六"],
      viewType: viewTypeMap[this.$props.type] || this.$props.type, // 'month','sec'
      hasTime: false,
      weeksDate: [], // render calendar days
      months: [], // render calendar months
      years: [], //render calendar years
      hours: [], //render hour scroll selector
      mins: [], //render min scroll selector
      secs: [], //render sec scroll selector
      selected: initSelected, // { year: now.getFullYear(), month: now.getMonth() + 1 },
      lastEmitDate: null
    };
  },
  computed: {
    showTimeContainer() {
      return this.date && ["hour", "min", "sec"].includes(this.type);
    },
    formattedString: {
      get() {
        if (!this.value) return "";
        if (Object.keys(this.selected).length === 0) return "";

        switch (this.type) {
          case "month":
            return `${this.selected.year}年${this.selected.month}月`;
          case "date":
            return `${this.selected.year}年${this.selected.month}月${this.selected.date}日`;
          case "sec":
            return this.constructor.options.filters.datetime(this.lastEmitDate);
        }
        return "---";
      },
      set() {}
    },
    inputReadonly() {
      return true;
    },
    monthFirstDayWeekIndex() {
      return new Date(`${this.year}/${this.month}/1`).getDay();
    },
    selectedMonth() {
      return `${this.selected.year}-${this.selected.month}`;
    },
    selectedDate() {
      const { year, month, date } = this.selected;
      return `${year}-${month}-${date}`;
    },
    selectedHour() {
      const { year, month, date, hour } = this.selected;
      return `${year}-${month}-${date}-${hour}`;
    },
    selectedMin() {
      const { year, month, date, hour, min } = this.selected;
      return `${year}-${month}-${date}-${hour}-${min}`;
    },
    selectedSec() {
      const { year, month, date, hour, min, sec } = this.selected;
      return `${year}-${month}-${date}-${hour}-${min}-${sec}`;
    },
    showPrevNextMonth() {
      return this.viewType === "date";
    }
  },
  watch: {
    // if (max) {
    //   enableRules.push(["<=", max === "now" ? now : toDate(max)]);
    // }
    // if (min) {
    //   enableRules.push([">=", min === "now" ? now : toDate(min)]);
    // }
    min(min) {
      const rule = this.enableRules.find(([oper]) => oper === ">=");
      if (rule) {
        rule[1] = toDate(min);
      } else {
        this.enableRules.push([">=", toDate(min)]);
      }
    },
    max(max) {
      const rule = this.enableRules.find(([oper]) => oper === "<=");
      if (rule) {
        rule[1] = toDate(max);
      } else {
        this.enableRules.push(["<=", toDate(max)]);
      }
    },
    type(type) {
      if (this.viewType !== type) {
        this.viewType = type;
      }
    },
    viewType(type) {
      switch (type) {
        case "year":
          this.renderYearView();
          this.renderMonthView();
          break;
        case "month":
          this.renderMonthView();
          break;
      }
    },
    year() {
      this.renderMonthView();
      this.renderCalendar();
    },
    month() {
      this.renderCalendar();
    },
    date() {
      this.renderTimeContainer();
    },
    hour() {
      // console.log("hour change");

      // const { year, month, date, hour = 0, min = 0 } = this.selected;

      this.renderTimeContainer();
    },
    minute(min) {
      // console.log("min change");
      this.$refs.min.scrollTo({
        left: 0,
        top: min * 20,
        behavior: "smooth"
      });
      this.renderTimeContainer();
    },
    sec(sec) {
      this.$refs.sec.scrollTo({
        left: 0,
        top: sec * 20,
        behavior: "smooth"
      });
    },
    value(value) {
      const date = value === "now" ? new Date() : toDate(value);
      this.date = date.getDate();
      Object.assign(this.selected, {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds()
      });
      this.$nextTick(this.handleSubmit);
    }
  },
  mounted() {
    this.tippyInstance = this.$refs.input.$el._tippy;
    // this.tippyInstance.show();
    const value = this.value || this.initValue;
    if (value) {
      this.date =
        value === "now" ? new Date().getDate() : toDate(value).getDate();
      this.$nextTick(this.handleSubmit);
    }
    this.tippyInstance.setProps({
      onShow: () => {
        if (this.showTimeContainer) {
          const { hour, min, sec } = this.selected;
          this.$nextTick(() => {
            this.$refs.hour.scrollTo(0, hour * 20);
            this.$refs.min.scrollTo(0, min * 20);
            this.$refs.sec.scrollTo(0, sec * 20);
          });
        }
      },
      onHide: () => {
        this.formAreaEmit && this.formAreaEmit("tippy-hide");
      }
    });
    this.renderCalendar();
    this.renderMonthView();
    this.renderYearView();
  },
  methods: {
    checkEnable(date, level) {
      const rules = this.enableRules.map(([oper, t]) => {
        const target = new Date(t);
        switch (level) {
          case "year":
            date.setMonth(0);
            target.setMonth(0);
          // falls through
          case "month":
            date.setDate(1);
            target.setDate(1);
          //falls through
          case "date":
            date.setHours(0);
            target.setHours(0);
          //falls through
          case "hour":
            date.setMinutes(0);
            target.setMinutes(0);
          //falls through
          case "min":
            date.setSeconds(0);
            target.setSeconds(0);
          //falls through
          case "sec":
            date.setMilliseconds(0);
            target.setMilliseconds(0);
          //falls through
        }

        // if (leave === "sec")
        // console.log(
        //   date.toLocaleDateString(),
        //   date.toLocaleTimeString(),
        //   oper,
        //   target.toLocaleDateString(),
        //   target.toLocaleTimeString()
        // );
        if (oper === ">=") {
          // console.log(date >= target);
          return d => d >= target;
        } else if (oper === "<=") {
          // console.log(date <= target);

          return d => d <= target;
        }
      });
      if (rules.some(rule => rule(date) === false)) {
        return false;
      }
      return true;
    },
    handleSubmit() {
      const {
        year,
        month,
        date = 1,
        hour = 0,
        min = 0,
        sec = 0
      } = this.selected;
      const emitDate = (() => {
        switch (this.type) {
          case "year":
            return new Date(year, 0);
          case "month":
            return new Date(year, month - 1);
          case "date":
            return new Date(year, month - 1, date);
          default:
            return new Date(year, month - 1, date, hour, min, sec);
        }
      })();
      this.lastEmitDate = emitDate;
      if (this.valueFormat === "timestamp") {
        this.$emit("input", emitDate.valueOf());
      } //else todo
    },
    handleClick(type, v) {
      if (typeof v === "undefined") return;
      const { year, month, date, min = 0 } = v;
      switch (type) {
        case "hour":
        case "min":
        case "sec":
          this.$refs[type].scrollTo({
            left: 0,
            top: v[type] * 20,
            behavior: "smooth"
          });

          if (type === "min") {
            this.minute = min;
          } else {
            this[type] = v[type];
          }
          this.selected[type] = v[type];
          break;
        case "date":
          Object.assign(this.selected, { year, month, date });
          // this.handleSubmit(); // todo enable to submit
          this.date = date;
          if (this.type === "date") {
            this.tippyInstance.hide();
          }
          break;
        case "month":
          // this.month = v;
          if (this.type === "month") {
            Object.assign(this.selected, { year, month });
            this.handleSubmit();
            this.tippyInstance.hide();
          } else {
            this.viewType = "date";
            this.month = month;
            this.renderCalendar();
          }
          break;
        case "year":
          this.year = v;
          if (this.type === "year") {
            this.handleSubmit(); //todo
          } else {
            this.viewType = "month";
          }
      }

      const fulldate = new Date(
        this.selected.year,
        this.selected.month - 1,
        this.selected.date,
        this.selected.hour || 0,
        this.selected.min || 0,
        this.selected.sec || 0
      );
      if (this.checkEnable(fulldate)) {
        this.handleSubmit();
        if (!this.selected.hour) {
          this.selected.hour = 0;
        }
        if (!this.selected.min) {
          this.selected.min = 0;
        }
        if (!this.selected.sec) {
          this.selected.sec = 0;
        }
      } else if (type === "date") {
        Object.assign(this.selected, {
          hour: undefined,
          min: undefined,
          sec: undefined
        });
        if (this.$refs.hour) {
          this.$refs.hour.scrollTo(0, 0);
          this.$refs.min.scrollTo(0, 0);
          this.$refs.sec.scrollTo(0, 0);
        }
      } else if (type === "hour") {
        Object.assign(this.selected, {
          min: undefined,
          sec: undefined
        });
        this.$refs.min.scrollTo(0, 0);
        this.$refs.sec.scrollTo(0, 0);
      } else if (type === "min") {
        Object.assign(this.selected, {
          sec: undefined
        });
        this.$refs.sec.scrollTo(0, 0);
      }
    },
    prepYear() {
      this.year -= 1;
    },
    nextYear() {
      this.year += 1;
    },
    preYears() {
      const startYear = this.years[0] - 9;
      this.renderYearView(startYear);
    },
    nextYears() {
      const startYear = this.years[0] + 9;
      this.renderYearView(startYear);
    },
    prepMonth() {
      if (this.month === 1) {
        this.year -= 1;
        this.month = 12;
      } else {
        this.month -= 1;
      }
      this.renderCalendar();
    },
    nextMonth() {
      if (this.month === 12) {
        this.year += 1;
        this.month = 1;
      } else {
        this.month += 1;
      }
      this.renderCalendar();
    },
    //month
    renderMonthView() {
      if (this.viewType !== "month") return;
      this.months = Array.from({ length: 12 }).map((_, index) => ({
        text: `${index + 1}月`,
        value: { year: this.year, month: index + 1 } //`${this.year}-${index + 1}` //`${this.year}-${index + 1}`
      }));
    },
    //year
    renderYearView(startYear = this.year - 4) {
      if (this.viewType !== "year") return;
      this.years = Array.from({ length: 9 }).map((_, i) => i + startYear);
    },
    // day
    renderCalendar() {
      if (this.viewType !== "date") return;
      const list = Array.from({
        length: this.monthFirstDayWeekIndex
      }).map(() => ({}));
      const monthLastDay = new Date(this.year, this.month, 0);
      for (let i = 0; ; i++) {
        const day = new Date(this.year, this.month - 1, 1 + i);
        if (day > monthLastDay) {
          break;
        }
        list.push({
          text: i + 1,
          // value: `${this.year}-${wrapperZero(this.month)}-${wrapperZero(i + 1)}`
          value: {
            year: this.year,
            month: this.month,
            date: i + 1
          }
        });
      }
      const weeks = [];
      while (list.length) {
        weeks.push(list.splice(0, 7));
      }
      this.weeksDate = weeks;
    },
    renderTimeContainer() {
      if (!this.year || !this.date) {
        return;
      }
      const { year, month, date, hour = 0, min = 0 } = this.selected;
      this.hours = Array.from({ length: 24 }).map((_, i) => ({
        text: wrapperZero(i),
        enable: this.checkEnable(new Date(year, month - 1, date, i), "hour"),
        hash: `${year}-${month}-${date}-${i}`,
        value: {
          year,
          month,
          date,
          hour: i
        }
      }));
      this.mins = Array.from({ length: 60 }).map((_, i) => ({
        text: wrapperZero(i),
        enable: this.checkEnable(
          new Date(year, month - 1, date, hour, i),
          "min"
        ),
        hash: `${year}-${month}-${date}-${hour}-${i}`,
        value: {
          year,
          month,
          date,
          hour,
          min: i
        }
      }));
      this.secs = Array.from({ length: 60 }).map((_, i) => ({
        text: wrapperZero(i),
        enable: this.checkEnable(
          new Date(year, month - 1, date, hour, min, i),
          "sec"
        ),
        hash: `${year}-${month}-${date}-${hour}-${min}-${i}`,
        value: {
          year,
          month,
          date,
          hour,
          min,
          sec: i
        }
      }));
    }
  }
};
</script>
