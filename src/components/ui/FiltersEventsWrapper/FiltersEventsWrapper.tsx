import { useCallback, useState, memo, useEffect } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import cls from "./FiltersEventsWrapper.module.scss";
import { optionsRoles } from "@/feature/MeetingForm/static";
import PlaceFilter from "@/components/ui/PlaceFilter/ui/PlaceFilter";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { eventsActions, getAllEvents, getEvents } from "@/core/store/slices/eventsSlice";
import { useSelector } from "react-redux";
import { convertDate } from "@/core/utils";

interface FiltersEventsWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FiltersRole {
  value: string;
  label: string;
}

export const FiltersEventsWrapper = memo((props: FiltersEventsWrapperProps) => {
  const { isOpen, onClose } = props;
  const { roleFilters } = useSelector(getAllEvents);
  const filteredEvents = useSelector(getEvents.selectAll);
  const [dates, setDates] = useState<string[]>([]);
  const [roles, setRoles] = useState<FiltersRole[]>(optionsRoles);
  const [filterRoles, setFilterRoles] = useState<string[]>([]);
  const [filterDates, setFilterDates] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filteredEvents) {
      setDates([...new Set(filteredEvents.map((event) => convertDate(event.date_time)))]);
    }
  }, [filteredEvents]);

  const onAddFilterRole = useCallback((value: string) => {
    if (value) {
      setFilterRoles((prev) => [...new Set([...prev, value])]);
    }
  }, []);

  const onAddFilterDate = useCallback((value: string) => {
    if (value) {
      setFilterDates((prev) => [...new Set([...prev, value])]);
    }
  }, []);

  const onSaveFilters = () => {
    dispatch(eventsActions.addRoleFilter(filterRoles));
    dispatch(eventsActions.addDatesFilter(filterDates));
    dispatch(eventsActions.getFilteredEvents());
    onClose();
  };

  const onCloseModal = () => {
    setFilterRoles(roleFilters);

    onClose();
  };

  const clearRoleFilters = () => {
    setFilterRoles([]);
    dispatch(eventsActions.cancelRoleFilter());
  };

  const clearDateFilters = () => {
    setFilterDates([]);
    dispatch(eventsActions.cancelDateFilter());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={cls.modal}>
      <div className={cls.filtersWrapper}>
        <h2 className={cls.filtersMainHeader}>Фильтр по мероприятиям</h2>
        <div>
          <div className={cls.headerWrapper}>
            <h3 className={cls.filtersHeader}>Для кого мероприятие</h3>
            {filterRoles.length > 0 && (
              <div className={cls.counterWrapper}>
                <div className={cls.counter}>{filterRoles.length}</div>
                <span>Сбросить</span>
                <Button className={cls.counterButton} variant="clear" onClick={clearRoleFilters} />
              </div>
            )}
          </div>
          <div className={cls.filtersRoles}>
            {roles.map((role) => (
              <PlaceFilter
                text={role.value}
                key={role.label}
                editable={true}
                isEditFilter={false}
                isFilterActive={filterRoles.indexOf(role.value) !== -1 ? true : false}
                onAdd={(value) => onAddFilterRole(value as string)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className={cls.headerWrapper}>
            <h3 className={cls.filtersHeader}>Даты мероприятия</h3>
            {filterDates.length > 0 && (
              <div className={cls.counterWrapper}>
                <div className={cls.counter}>{filterDates.length}</div>
                <span>Сбросить</span>
                <Button className={cls.counterButton} variant="clear" onClick={clearDateFilters} />
              </div>
            )}
          </div>
          <div className={cls.filtersRoles}>
            {dates.map((date, index) => (
              <PlaceFilter
                text={date}
                key={`${date}-timeFilter-${index}`}
                editable
                isEditFilter={false}
                isFilterActive={filterDates.indexOf(date) !== -1 ? true : false}
                onAdd={(value) => onAddFilterDate(value as string)}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <h3 className={cls.filtersHeader}>Время начала мероприятия</h3>
          <div></div>
        </div> */}
        <div className={cls.filtersButtonWrapper}>
          <Button variant="loadMore" className={cls.buttonCancel} onClick={onCloseModal}>
            Отмена
          </Button>
          <Button variant="desktop" onClick={onSaveFilters}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
});
