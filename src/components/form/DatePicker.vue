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
              <span v-if="viewType !== 'month'">{{ month }}月</span>
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
        {{ value }}
        <table class="calendar-table" v-if="viewType === 'date'">
          <thead>
            <tr>
              <th v-for="(d, index) in dayList" :key="index">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wIndex) in weeksDate" :key="wIndex">
              <td
                v-for="({ text, value }, dIndex) in week"
                :key="dIndex"
                :class="{
                  disabled: !value,
                  selected: $data.value === value
                }"
                @click="handleClick('day', value)"
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
      <div class="time-container"></div>
    </div>
  </div>
</template>
<script>
const wrapperZero = number => `${number < 10 ? 0 : ""}${number}`;
export default {
  name: "DatePicker",
  model: {
    event: "input"
  },
  props: {
    initValue: {
      default: ""
    },
    type: {
      type: String,
      default: "date"
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
    let initSelected = {};
    const enableRules = [];
    const { min, max, initValue } = this.$props;
    // if (type === "month") {
    //   now.setDate(1);
    //   now.setHours(0);
    //   now.setMinutes(0);
    //   now.setSeconds(0);
    //   now.setMilliseconds(0);
    // }
    if (max) {
      enableRules.push(["<=", max === "now" ? now : max]);
    }
    if (min) {
      enableRules.push([">=", min === "now" ? now : min]);
    }
    if (initValue) {
      const baseTime = initValue === "now" ? now : initValue;
      Object.assign(initSelected, {
        year: baseTime.getFullYear(),
        month: baseTime.getMonth() + 1,
        date: baseTime.getDate(),
        hour: baseTime.getHours(),
        min: baseTime.getMinutes(),
        sec: baseTime.getSeconds()
      });
    }
    return {
      enableRules,
      tippyInstance: null,
      value: "",
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      dayList: ["日", "一", "二", "三", "四", "五", "六"],
      viewType: this.$props.type, // 'day','month',year
      hasTime: false,
      weeksDate: [], // render calendar days
      months: [], // render calendar months
      years: [], //render calendar years
      selected: initSelected, // { year: now.getFullYear(), month: now.getMonth() + 1 },
      xxxxx: "x"
    };
  },
  computed: {
    formattedString: {
      get() {
        switch (this.type) {
          case "month":
            if (Object.keys(this.selected).length === 0) return "";
            return `${this.selected.year}年${this.selected.month}月`;
        }
        return "abc";
      },
      set() {}
    },
    inputReadonly() {
      return true;
    },
    monthFirstDayWeekIndex() {
      return new Date(`${this.year}-${this.month}`).getDay();
    },
    selectedMonth() {
      return `${this.selected.year}-${this.selected.month}`;
    },
    showPrevNextMonth() {
      return this.viewType === "date";
    }
  },
  watch: {
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
      }
    },
    year() {
      this.renderMonthView();
    }
  },
  mounted() {
    this.tippyInstance = this.$refs.input.$el._tippy;
    // this.tippyInstance.show();
    if (this.initValue) {
      this.$nextTick(this.handleSubmit);
    }
    this.renderCalendar();
    this.renderMonthView();
    this.renderYearView();
  },
  methods: {
    checkEnable(date, leave) {
      const rules = this.enableRules.map(([oper, t]) => {
        const target = new Date(t);
        switch (leave) {
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
        // console.log(
        //   date.toLocaleDateString(),
        //   oper,
        //   target.toLocaleDateString()
        // );
        if (oper === ">=") {
          return d => d >= target;
        } else if (oper === "<=") {
          return d => d <= target;
        }
      });
      if (rules.some(rule => rule(date) === false)) {
        return false;
      }
      return true;
    },
    handleSubmit() {
      const { year, month } = this.selected;
      switch (this.type) {
        case "month":
          if (this.valueFormat === "timestamp") {
            this.$emit("input", new Date(year, month - 1).valueOf());
          }
          break;
      }
      this.tippyInstance.hide();
    },
    handleClick(type, v) {
      if (typeof v === "undefined") return;
      const { year, month } = v;
      switch (type) {
        case "day":
          this.value = v;
          break;
        case "month":
          // this.month = v;
          if (this.type === "month") {
            Object.assign(this.selected, { year, month });
            this.handleSubmit();
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
          value: `${this.year}-${wrapperZero(this.month)}-${wrapperZero(i + 1)}`
        });
      }
      const weeks = [];
      while (list.length) {
        weeks.push(list.splice(0, 7));
      }
      this.weeksDate = weeks;
    }
  }
};
</script>
