<template>
  <div shadow="never" class="p-20 w-full h-full" v-loading="loading">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="tableData"
          :width="width"
          :height="height"
          :class="kls"
          :cell-props="cellProps"
          row-key="studentId"
          fixed />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted } from 'vue';
import type { Column } from 'element-plus';
import { getProgressRank, ProgressRankVO } from '@/api/ranking/progress/index';
import { ElButton, ElSelectV2, ElIcon, ElPopover } from 'element-plus';
import { Filter } from '@element-plus/icons-vue';

import type { HeaderCellSlotProps } from 'element-plus';

// TYPE
interface FilterFormType {
  studentName: string;
  studentNo: string;
  gradeName: string;
  className: string;
  facultyName: string;
  majorName: string;
}

type FilterDataItem = {
  label: string;
  value: string;
};

interface FilterDataType {
  gradeName: readonly FilterDataItem[];
  className: readonly FilterDataItem[];
  facultyName: readonly FilterDataItem[];
  majorName: readonly FilterDataItem[];
}

// CONST
const columns: Column[] = [
  {
    align: 'center',
    dataKey: 'rank',
    title: '排名',
    width: 150,
  },
  {
    align: 'center',
    dataKey: 'year',
    title: '年份',
    width: 150,
  },
  {
    align: 'center',
    dataKey: 'month',
    title: '月份',
    width: 150,
  },
  {
    align: 'center',
    dataKey: 'studentName',
    title: '学生姓名',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover v-model:visible={visible1.value} trigger="click" {...{ width: 200 }}>
            {{
              default: () => (
                <div>
                  <div>
                    <el-input v-model={filterForm.value.studentName} placeholder="请输入学生姓名" />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton text onClick={() => onReset(props.column.dataKey as keyof FilterFormType)}>
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      );
    },
  },
  {
    align: 'center',
    dataKey: 'studentNo',
    title: '学号',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover v-model:visible={visible2.value} trigger="click" {...{ width: 200 }}>
            {{
              default: () => (
                <div>
                  <div>
                    <el-input v-model={filterForm.value.studentNo} placeholder="请输入学号" />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton text onClick={() => onReset(props.column.dataKey as keyof FilterFormType)}>
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      );
    },
  },
  {
    align: 'center',
    dataKey: 'gradeName',
    title: '所属年级',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover v-model:visible={visible3.value} trigger="click" {...{ width: 200 }}>
            {{
              default: () => (
                <div>
                  <div>
                    <ElSelectV2
                      v-model={filterForm.value.gradeName}
                      options={[...filterData.gradeName]}
                      placeholder="请选择年级"
                      teleported={false}
                    />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton text onClick={() => onReset(props.column.dataKey as keyof FilterFormType)}>
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      );
    },
  },
  {
    align: 'center',
    dataKey: 'className',
    title: '所属班级',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover v-model:visible={visible4.value} trigger="click" {...{ width: 200 }}>
            {{
              default: () => (
                <div>
                  <div>
                    <ElSelectV2
                      v-model={filterForm.value.className}
                      options={[...filterData.className]}
                      placeholder="请选择班级"
                      teleported={false}
                    />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton text onClick={() => onReset(props.column.dataKey as keyof FilterFormType)}>
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      );
    },
  },
  {
    align: 'center',
    dataKey: 'classTeacher',
    title: '班主任',
    width: 150,
  },
  {
    align: 'center',
    dataKey: 'facultyName',
    title: '所属系部',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover v-model:visible={visible5.value} trigger="click" {...{ width: 200 }}>
            {{
              default: () => (
                <div>
                  <div>
                    <ElSelectV2
                      v-model={filterForm.value.facultyName}
                      options={[...filterData.facultyName]}
                      placeholder="请选择系部"
                      teleported={false}
                    />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton text onClick={() => onReset(props.column.dataKey as keyof FilterFormType)}>
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      );
    },
  },
  {
    align: 'center',
    dataKey: 'majorName',
    title: '所属专业',
    width: 150,
    headerCellRenderer: (props: HeaderCellSlotProps) => {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 size-14 weight-700">{props.column.title}</span>
          <ElPopover v-model:visible={visible6.value} trigger="click" {...{ width: 200 }}>
            {{
              default: () => (
                <div>
                  <div>
                    <ElSelectV2
                      v-model={filterForm.value.majorName}
                      options={[...filterData.majorName]}
                      placeholder="请选择专业"
                      teleported={false}
                    />
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <ElButton text onClick={onFilter}>
                      确 认
                    </ElButton>
                    <ElButton text onClick={() => onReset(props.column.dataKey as keyof FilterFormType)}>
                      清 空
                    </ElButton>
                  </div>
                </div>
              ),
              reference: () => (
                <ElIcon class="cursor-pointer">
                  <Filter />
                </ElIcon>
              ),
            }}
          </ElPopover>
        </div>
      );
    },
  },
  {
    align: 'center',
    dataKey: 'score',
    title: '成长值',
    width: 150,
  },
  {
    align: 'center',
    dataKey: 'rankChange',
    title: '上升名次',
    width: 150,
  },
  {
    align: 'center',
    dataKey: 'scoreChange',
    title: '本月获取分数',
    width: 150,
  },
];

const cellProps = ({ columnIndex }: { columnIndex: number }) => {
  const key = `hovering-col-${columnIndex}`;
  return {
    ['data-key']: key,
    onMouseenter: () => {
      kls.value = key;
    },
    onMouseleave: () => {
      kls.value = '';
    },
  };
};

const filterData: FilterDataType = {
  gradeName: [],
  className: [],
  facultyName: [],
  majorName: [],
};

// DATA
let data: readonly ProgressRankVO[];
const loading = ref<boolean>(false);
const tableData = ref<ProgressRankVO[]>([]);
const kls = ref<string>('');
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);

const filterForm = ref<FilterFormType>({
  studentName: '',
  studentNo: '',
  gradeName: '',
  className: '',
  facultyName: '',
  majorName: '',
});

// ONMOUNTED
onMounted(() => {
  fetchList();
});

// METHODS
const fetchList = async () => {
  loading.value = true;
  try {
    const { data: res } = await getProgressRank();
    data = Object.freeze(res);
    tableData.value = [...data];
    let gradeName = new Set<string>();
    let className = new Set<string>();
    let facultyName = new Set<string>();
    let majorName = new Set<string>();
    data.forEach(item => {
      gradeName.add(item.gradeName);
      className.add(item.className);
      facultyName.add(item.facultyName);
      majorName.add(item.majorName);
    });
    filterData.gradeName = [...gradeName].map(item => {
      return {
        label: item,
        value: item,
      };
    });
    filterData.className = [...className].map(item => {
      return {
        label: item,
        value: item,
      };
    });
    filterData.facultyName = [...facultyName].map(item => {
      return {
        label: item,
        value: item,
      };
    });
    filterData.majorName = [...majorName].map(item => {
      return {
        label: item,
        value: item,
      };
    });
  } finally {
    loading.value = false;
  }
};

const onFilter = () => {
  const { studentName, studentNo, gradeName, className, facultyName, majorName } = filterForm.value;

  tableData.value = data.filter(item => {
    if (studentName && !item.studentNo.includes(studentName)) {
      return false;
    }
    if (studentNo && !item.studentNo.includes(studentNo)) {
      return false;
    }
    if (gradeName && item.gradeName !== gradeName) {
      return false;
    }
    if (className && item.className !== className) {
      return false;
    }
    if (facultyName && item.facultyName !== facultyName) {
      return false;
    }
    if (majorName && item.majorName !== majorName) {
      return false;
    }
    return true;
  });
};
const onReset = (columnKey: keyof FilterFormType) => {
  filterForm.value[columnKey] = '';
  onFilter();
};
</script>

<style>
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
  background: var(--el-table-row-hover-bg-color);
}

[data-key='hovering-col-0'] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
</style>