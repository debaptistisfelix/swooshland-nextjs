import styles from './FilterBar.module.css'
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect'
import CustomFilterSelect from '@app/components/Reusables/CustomFilterSelect/CustomFilterSelect'
import FilterTag from './FilterTag/FilterTag'


export default function FilterBar({selectOptions,
     selectedOption,
     handleOptionChange,
    handleBrandFilterOptionChage,
     selectedBrand
  }) {
  

  const brandFilterOptions = {
    label: "Brand",
    options: ["Adidas", "Fila", "Jordan", "Nike", "Puma", ]
    }

     
  
  return (
    <main className={styles.bar}>
        <section className={styles.filterOptionsBox}>
            <h3 className={styles.label}>
                Filter by:
            </h3>
            <div className={styles.filterList}>
              <div className={styles.saleFilterContainer}>
                {/* BRAND FILTER CUSTOM SELECT */}
              <CustomFilterSelect filterOptions={brandFilterOptions} handleFilterOptionChange={handleBrandFilterOptionChage}/>
              </div>
            </div>
        </section>
        <section className={styles.sortOptionsBox}>
        <h3 className={styles.label}>
                Sort by:
            </h3>
            <div className={styles.sortSelectorBox}>
              <CustomSelect position="bottom" selectOptions={selectOptions} handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
            </div>
        </section>
        <section className={styles.selectedFilterBox}>
          {selectedBrand !== "All Brands" && <FilterTag filterOption={selectedBrand}/>}
        </section>
    </main>
  )
}
