import { useCallback, useState, memo } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import cls from "./FiltersEventsWrapper.module.scss";
import { optionsRoles } from "@/feature/MeetingForm/static";
import PlaceFilter from "@/components/ui/PlaceFilter/ui/PlaceFilter";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { eventsActions, getAllEvents } from "@/core/store/slices/eventsSlice";
import { useSelector } from "react-redux";

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
  const [roles, setRoles] = useState<FiltersRole[]>(optionsRoles);
  const [filterRoles, setFilterRoles] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const onAddFilter = useCallback((value: string) => {
    if (value) {
      setFilterRoles((prev) => [...new Set([...prev, value])]);
    }
  }, []);

  const onSaveFilters = () => {
    dispatch(eventsActions.addRoleFilter(filterRoles));
    dispatch(eventsActions.getFilteredEvents());
    onClose();
  };

  const onCloseModal = () => {
    setFilterRoles(roleFilters);

    onClose();
  };

  const clearRoleFilters = () => {
    setFilterRoles([]);
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
                onAdd={(value) => onAddFilter(value as string)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className={cls.filtersHeader}>Даты мероприятия</h3>
          <div></div>
        </div>
        <div>
          <h3 className={cls.filtersHeader}>Время начала мероприятия</h3>
          <div></div>
        </div>
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
