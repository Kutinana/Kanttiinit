import { createMemo, For } from 'solid-js';
import { styled } from 'solid-styled-components';
import { computedState } from '../../state';
import type { CourseType } from '../../types';
import Course from './Course';

interface CourseGroup {
  key: string;
  originalKey?: string;
  courses: CourseType[];
}

const getCourseGroup = (course: CourseType) => {
  if (course.category !== undefined) {
    return course.category;
  }
  if (course.originalTitle !== undefined) {
    return '';
  }
  if (!course.title) {
    return '';
  }
  const match = course.title.match(/^([^:0-9][^:]*?):\s+(.+)$/);
  if (match) {
    const candidate = match[1].trim();
    if (
      !candidate.toLowerCase().startsWith('klo') &&
      !candidate.toLowerCase().startsWith('huom')
    ) {
      return candidate;
    }
  }
  return '';
};

const cleanCourseTitle = (title: string, groupKey: string) => {
  if (!groupKey) return title;
  const escaped = groupKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return title.replace(new RegExp(`^${escaped}\\s*[:：]\\s*`, 'i'), '').trim();
};

interface Props {
  courses: CourseType[];
  loading?: boolean;
  class?: string;
}

const Container = styled.ul`
  padding: 0;
  margin: 0;
`;

const Group = styled.ul`
  padding: 0;
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 0.6rem;
  }
`;

const GroupTitle = styled.h1`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4ch;
  color: var(--text-secondary);
  margin: 0 0 0.25rem 0;
  font-size: 0.82em;
  font-weight: 500;
`;

const GroupSubTitle = styled.span`
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 400;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const capitalize = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};

const CourseList = (props: Props) => {
  const courseGroups = createMemo(() => {
    const groups = props.courses.reduce(
      (g, course) => {
        const group = getCourseGroup(course);
        if (group in g) {
          g[group].push(course);
        } else {
          g[group] = [course];
        }
        return g;
      },
      {} as { [key: string]: CourseType[] },
    );

    return Object.keys(groups).map(groupKey => {
      const groupCourses = groups[groupKey].filter(c => !!c.title);
      const originalCategory = groupCourses.find(
        c => c.originalCategory,
      )?.originalCategory;
      return {
        courses: groupCourses.map(c => ({
          ...c,
          title: cleanCourseTitle(c.title, groupKey),
        })),
        key: groupKey,
        originalKey: originalCategory,
      };
    });
  });

  return (
    <Container {...props}>
      {!props.loading && !props.courses.length && (
        <EmptyText>{computedState.translations().noMenu}</EmptyText>
      )}
      <For each={courseGroups()}>
        {(group: CourseGroup) => (
          <Group>
            {group.key && (
              <GroupTitle>
                <span>{capitalize(group.key)}</span>
                {group.originalKey && group.originalKey !== group.key && (
                  <GroupSubTitle>({group.originalKey})</GroupSubTitle>
                )}
              </GroupTitle>
            )}
            <For each={group.courses}>{c => <Course course={c} />}</For>
          </Group>
        )}
      </For>
    </Container>
  );
};

export default CourseList;
