import { shallowMount } from "@vue/test-utils";
import NavbarSearch from "@/components/navbar/NavbarSearch.vue";

describe("NavbarSearch.vue", () => {
  it("input search value", async () => {
    const search = "new message";
    const wrapper = shallowMount(NavbarSearch);
    const resetBtn = wrapper.find("button");
    const input = wrapper.find("input");

    expect(input.element.value).toContain("");
    input.setValue(search);
    expect(input.element.value).toContain(search);
    await resetBtn.trigger("click");

    expect(input.element.value).toContain("");
  });

  it("input search value and emit search event", async () => {
    let search = "n";
    const wrapper = shallowMount(NavbarSearch);
    const input = wrapper.find("input");

    expect(input.element.value).toContain("");
    input.setValue(search);
    expect(input.element.value).toContain(search);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().search.length).toBe(1);
    expect(wrapper.emitted().search[0]).toEqual([{ text: "" }]);

    search = "test";
    input.setValue(search);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().search.length).toBe(2);
    expect(wrapper.emitted().search[1]).toEqual([{ text: search }]);

    search = "";
    input.setValue(search);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().search.length).toBe(3);
    expect(wrapper.emitted().search[2]).toEqual([{ text: search }]);
  });
});
