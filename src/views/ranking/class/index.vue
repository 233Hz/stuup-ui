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
          row-key="classId"
          fixed />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted } from 'vue';
import type { Column } from 'element-plus';
import { getClassRank, ClassRankVO } from '@/api/ranking/class/index';
import { ElButton, ElSelectV2, ElIcon, ElPopover } from 'element-plus';
import { Filter } from '@element-plus/icons-vue';

import type { HeaderCellSlotProps } from 'element-plus';

// TYPE
interface FilterFormType {
  className: string;
  gradeName: string;
  facultyName: string;
  majorName: string;
}

type FilterDataItem = {
  label: string;
  value: string;
};

interface FilterDataType {
  gradeName: readonly FilterDataItem[];
  facultyName: readonly FilterDataItem[];
  majorName: readonly FilterDataItem[];
}

// CONST
const columns: Column[] = [
  {
    align: 'center',
    dataKey: 'rank',
    title: '排名',
    width: 50,
  },
  {
    align: 'center',
    dataKey: 'className',
    title: '班级名称',
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
                    <el-input v-model={filterForm.value.className} placeholder="请输入班级名称" />
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
    dataKey: 'gradeName',
    title: '所属年级',
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
    dataKey: 'facultyName',
    title: '所属系部',
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
    width: 300,
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
    width: 100,
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
  facultyName: [],
  majorName: [],
};

// DATA
let data: readonly ClassRankVO[];
const loading = ref<boolean>(false);
const tableData = ref<ClassRankVO[]>([]);
const kls = ref<string>('');
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const filterForm = ref<FilterFormType>({
  className: '',
  gradeName: '',
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
    const { data: res } = await getClassRank();
    data = Object.freeze(res);
    tableData.value = [...data];
    let gradeName = new Set<string>();
    let facultyName = new Set<string>();
    let majorName = new Set<string>();
    data.forEach(item => {
      gradeName.add(item.gradeName);
      facultyName.add(item.facultyName);
      majorName.add(item.majorName);
    });
    filterData.gradeName = [...gradeName].map(item => {
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
  const { className, gradeName, facultyName, majorName } = filterForm.value;

  tableData.value = data.filter(item => {
    if (className && !item.className.includes(className)) {
      return false;
    }
    if (gradeName && item.gradeName !== gradeName) {
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
