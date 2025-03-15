<template>
  <div :class="calendarClass">
    <div :class="calendarContainerClass">
      <div
        v-for="(data, dataIdx) in monthsData"
        :key="'month_data' + dataIdx"
        :class="data.classes"
      >
        <div class="calendar-header">
          <div class="month-name">
            <template v-if="dataIdx == 0">
              <span
                @click="movePrevMonth()"
                class="prev-icon"
                v-if="nextPrevIcon"
                :class="{ disabled: isPrevMonthDisabled }"
              ></span>
              <span @click="movePrevMonth()" class="prev-text" v-else
                >PREV</span
              >
            </template>

            <span class="month-text"> {{ data.monthName }} </span>
            <template
              v-if="(!enableSecondCalendar && dataIdx == 0) || dataIdx == 1"
            >
              <span
                @click="moveNextMonth()"
                class="next-icon"
                v-if="nextPrevIcon"
                :class="{ disabled: isNextMonthDisabled }"
              ></span>
              <span @click="moveNextMonth()" class="next-text" v-else
                >NEXT</span
              >
            </template>
          </div>
          <div class="day-name">
            <span v-for="(day, index) in daysName" :key="'date_name' + index">
              {{ day }}
            </span>
          </div>
        </div>
        <div class="calendar-dates">
          <div
            class="date-row"
            v-for="dateRowIdx in data.calendarRows"
            :key="dateRowIdx"
          >
            <div
              v-for="(dt, index) in data.dates.slice(
                7 * (dateRowIdx - 1),
                7 * dateRowIdx
              )"
              :key="index"
              class="date"
              :class="{
                'date-selected': dt.selected,
                'date-disabled': dt.isDisabled,
                'date-today': dt.isToday,
                'date-selected-start': dt.startDateSelected,
                'date-selected-end': dt.endDateSelected,
              }"
              @click="onSelectDate(dt)"
              @mouseover="hoverDate(dt)"
            >
              <span>{{ dt.dateNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="calendarFooterClass">
      <div class="calendar-actions">
        <button class="btn btn-clear" @click="clickClear">
          {{ btnClearText || "Clear" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from "vue";
// import { format, addMonths } from "date-fns";

// ✅ Props
const props = defineProps({
  modelValue: { type: [Date, Object, String], default: null },
  isRange: { type: Boolean, default: true },
  enableSecondCalendar: { type: Boolean, default: true },
  givenDays: {
    type: Array,
    default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  btnClearText: { type: String, default: "Clear" },
});

// ✅ Emits
const emit = defineEmits(["update:modelValue", "onSelect"]);

// ✅ Reactive State
const selected = ref({
  start_date: null,
  end_date: null,
});

// ✅ Computed Properties
const daysName = computed(() => props.givenDays);
// const currentMonth = computed(() => format(new Date(), "MMMM"));
// const nextMonth = computed(() => format(addMonths(new Date(), 1), "MMMM"));

// ✅ Select Date Logic
const onSelectDate = (dt) => {
  if (!selected.value.start_date) {
    selected.value.start_date = dt.date;
  } else {
    selected.value.end_date = dt.date;
    emit("update:modelValue", [
      selected.value.start_date,
      selected.value.end_date,
    ]);
  }
};

// ✅ Clear Dates
const clickClear = () => {
  selected.value.start_date = null;
  selected.value.end_date = null;
  emit("update:modelValue", null);
};
</script>

<style lang="scss">
.g-calendar {
  .calendar-container {
    display: flex;
    .day-name {
      display: flex;
      justify-content: space-between;
      padding-top: 2px;
      padding-bottom: 2px;
      span {
        width: 100%;
        text-align: center;
        font-weight: 550;
      }
    }
    .calendar-dates {
      display: flex;
      flex-wrap: wrap;
      .date {
        width: 14.28%;
        text-align: center;
        padding: 7px;
        &.date-selected {
          background: #4fa5a1 !important;
          color: #fff;
        }
        &.date-disabled {
          background: #7a7575;
          color: #a19c9cf0;
        }
      }
    }
  }
}
</style>
