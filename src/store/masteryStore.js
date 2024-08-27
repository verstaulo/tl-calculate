import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import mergeObjects from '../utils/mergeObjects.js';

export const useMasteryStore = defineStore('masteryStore', () => {
    const availableMasteryPoints = ref({
        main_weapon: 16,
        secondary_weapon: 16
    });
    const branchesStats = ref({
        main_weapon: {
            rootBonus: [],
            firstBranch: [],
            secondBranch: [],
            thirdBranch: []
        },
        secondary_weapon: {
            firstBranch: [],
            secondBranch: [],
            thirdBranch: []
        }
    });

    const masteryStats = computed(() => {
        const result = mergeObjects(
            ...branchesStats.value.main_weapon.firstBranch,
            ...branchesStats.value.main_weapon.secondBranch,
            ...branchesStats.value.main_weapon.thirdBranch,
            ...branchesStats.value.main_weapon.rootBonus
        );
        return Object.keys(result).length > 0 ? result : null;
    });

    function addMasteryStats(source, branchName, stats) {
        if (availableMasteryPoints.value[source] > 0) {
            branchesStats.value[source][branchName].push(stats);
        }
        availableMasteryPoints.value[source] -= 1;
    }

    function removeMasteryStats(source, branchName) {
        branchesStats.value[source][branchName].pop();
        if (branchName !== 'rootBonus') {
            availableMasteryPoints.value[source] += 1;
        }
    }

    function resetMasteryStore() {
        availableMasteryPoints.value.main_weapon = 16;
        availableMasteryPoints.value.secondary_weapon = 16;
        branchesStats.value.main_weapon.firstBranch.length = 0;
        branchesStats.value.main_weapon.secondBranch.length = 0;
        branchesStats.value.main_weapon.thirdBranch.length = 0;
        branchesStats.value.main_weapon.rootBonus.length = 0;
    }

    return {
        availableMasteryPoints,
        masteryStats,
        branchesStats,
        removeMasteryStats,
        addMasteryStats,
        resetMasteryStore
    };
});
