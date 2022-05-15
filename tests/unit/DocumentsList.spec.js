import { mount } from "@vue/test-utils";
import { DocumentsList } from "@/components/DocumentsList";
import store from "@/store";

// mock i18n so we don't need to load the library
const $t = () => {};

describe("Documents List Component", () => {
  beforeEach(() => {
    Promise.all([
      store.dispatch(
        "category/setSelectedCategory",
        require("../mock/category.json")
      ),
      store.dispatch(
        "category/setDocuments",
        require("../mock/documents_list.json").results.map((document) => {
          return store.getters["category/document"](document);
        })
      ),
    ]);
  });
  it("document list renders with selected category", () => {
    const wrapper = mount(DocumentsList, {
      store,
      mocks: { $t },
    });
    expect(wrapper.find(".documents-list-top h2").text()).toBe(
      require("../mock/category.json").name
    );
  });
  it("document list renders with all the documents", async () => {
    const wrapper = mount(DocumentsList, {
      store,
      mocks: { $t },
    });
    expect(
      wrapper.findAll(".documents-list-bottom .documents-list-thumbnail").length
    ).toBe(require("../mock/documents_list.json").results.length);
  });

  it("document list click adds selected class", async () => {
    const wrapper = mount(DocumentsList, {
      store,
      mocks: { $t },
    });
    await wrapper
      .findAll(".documents-list-bottom .documents-list-thumbnail")
      .at(1)
      .trigger("click");
    expect(
      wrapper
        .findAll(".documents-list-bottom .documents-list-thumbnail")
        .at(1)
        .classes()
    ).toContain("selected");
  });

  it("document list click adds selected document to store", async () => {
    const wrapper = mount(DocumentsList, {
      store,
      mocks: { $t },
    });
    await wrapper
      .findAll(".documents-list-bottom .documents-list-thumbnail")
      .at(1)
      .trigger("click");
    expect(store.state.document.documentId).toEqual(
      require("../mock/documents_list.json").results[1].id
    );
  });
});