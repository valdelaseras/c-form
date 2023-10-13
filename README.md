# Web component form module

A native web component form module. The components are made to be as flexible, un-opinionated, and as
close to the standard implementation of form elements as possible, while adding a bunch of convenient functionality to
make form implementation more easier.

There are no set templates or styles: there are occasional elements, class names and attributes that are required
in order for c-form to work, these will be marked as such. Other than that, this approach offers a lot of flexibility to
do what you want.

## CFormQuestion

@todo: describe

## CFormQuestion components

### c-checkbox

@required

`.form-question` on the root element if the checkbox is not part of a group

`[data-key]`

`.helper-text` which can be any (text) element of choice. Helper texts ( for invalid values ) will be displayed here

```html
<c-checkbox class="form-question"
            data-key="">
    <input type="checkbox"
           id="c-checkbox-demo"
           tabindex="0"
           required
           name="checkbox-demo"
           value="checkbox-solo"/>
    <label for="c-checkbox-demo">
        Label
    </label>
    <small class="helper-text"></small>
</c-checkbox>
```

### c-choice-group

A choice group is a group of inputs of type `checkbox` or `radio`

@required

`.form-question` on the root element ( not on the individual checkboxes in the group )

`[data-key]`

`.helper-text` which can be any (text) element of choice. Helper texts ( for invalid values ) will be displayed here

`[data-name]` add this attribute to the root element, and give it the same value as `[data-group]`

`[data-group]` add this attribute to the root of each choice selection element

@optional

`[data-required]` to make this form question required, add this attribute to the root element

```html
<c-choice-group class="form-question"
                data-key=""
                data-name="c-choice-group-demo"
                data-is-required>
    <label>
        Label
    </label>
    <c-checkbox data-group="c-choice-group-demo">
        <input type="checkbox"
               id="checkbox-a"
               tabindex="0"
               checked
               name="demo"
               value="checkbox-a"/>
        <label for="checkbox-a">
            Checkbox A
        </label>
    </c-checkbox>
    <c-checkbox data-group="c-choice-group-demo">
        <input type="checkbox"
               id="checkbox-b"
               name="demo"
               tabindex="0"
               value="checkbox-b"/>
        <label for="checkbox-b">
            Checkbox B
        </label>
    </c-checkbox>
    <c-checkbox data-group="c-choice-group-demo">
        <input type="checkbox"
               id="checkbox-c"
               name="demo"
               tabindex="0"
               value="checkbox-c"/>
        <label for="checkbox-c">
            Checkbox C
        </label>
    </c-checkbox>
    <small class="helper-text"></small>
</c-choice-group>
```

Alternatively, use radio inputs: 

```html
<c-radio data-group="c-choice-group-demo">
    <input type="radio"
           id="radio-a"
           tabindex="0"
           name="demo"
           value="radio-a"/>
    <label for="radio-a">
        Radio A
    </label>
</c-radio>
```

### c-input

Input types may be common types like `text`, `email`, `tel`, `url` etc. 

- Use [c-checkbox](#c-checkbox) for type `checkbox`
- Use [c-radio](#c-choice-group) for type `radio` in a `c-choice-group`
- Use [c-file-input](#c-file-input) for type `file`

@required

`.form-question` on the root element if the checkbox is not part of a group

`[data-key]`

`.helper-text` which can be any (text) element of choice. Helper texts ( for invalid values ) will be displayed here

```html
<c-input class="form-question" 
         data-key="">
    <label for="c-input-demo">
        Label
    </label>
    <input id="c-input-demo"
           type="text"
           required/>
    <small class="helper-text"></small>
</c-input>
```

### c-select

@required

`.form-question` on the root element if the checkbox is not part of a group

`[data-key]`

`.helper-text` which can be any (text) element of choice. Helper texts ( for invalid values ) will be displayed here

#### Regular

```html
<c-select class="form-question"
          data-key="">
    <label for="c-select-demo">
        Label
    </label>
    <select id="c-select-demo"
            tabindex="0"
            required">
        <option value="foo">foo</option>
        <option value="faa">faa</option>
        <option value="fuu">fuu</option>
        <option value="fee">fee</option>
    </select>
    <small class="helper-text"></small>
</c-select>
```

#### With external data options

Another option is to have an external data source render the options of the select element. You
You'll need to add the following directory structure:

@todo ... describe

@required

`.form-question` on the root element if the checkbox is not part of a group

`[data-key]`

`.helper-text` which can be any (text) element of choice. Helper texts ( for invalid values ) will be displayed here

`[data-external-options]` add this attribute to the root element and set the value to the target exported DataSource

The external data must be formatted to a simple array of objects with label and value keys:

```javascript
[
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' }
] 
``` 

or as JSON:

```json
[
  { "label":  "a", "value":  "a" },
  { "label":  "b", "value":  "b" },
  { "label":  "c", "value":  "c" }
]
```

```html
<c-select class="form-question"
          data-key=""
          data-external-options="sampleData">
    <label for="c-select-demo">
        Label
    </label>
    <select id="c-select-demo"
            tabindex="0"
            required">
    </select>
    <small class="helper-text"></small>
</c-select>
```


### c-textarea

@required

`.form-question` on the root element if the checkbox is not part of a group

`[data-key]`

`.helper-text` which can be any (text) element of choice. Helper texts ( for invalid values ) will be displayed here

@optional

`.char-counter`, `.counter` & `.max-length` if you want to display a character counter on a set `textarea[maxlength]`,
you can use these classes to display the maximum and current character count. Be sure not to forget to set the
native `textarea[maxlength]` 

```html
<c-textarea class="form-question"
            data-key="">
    <label for="c-textarea-demo">
        Label
    </label>
    <textarea id="c-textarea-demo"
              tabindex="0"
              required
              maxlength="200"
              rows="4">
    </textarea>
    <div class="char-counter">
        <span class="counter"></span> /  <span class="maxlength"></span>
    </div>
    <small class="helper-text"></small>
</c-textarea>
```

### c-file-input

@todo: describe

@required 

```html
<c-file-input class="form-question"
              data-key=""
              data-max-size="5242880">
    <label tabindex="0" 
           for="c-file-input-demo"></label>
    <input type="file"
           required
           accept=".doc,.docx,application/pdf,application/msword"
           id="c-file-input-demo"/>

    <!--file selection-->
    <div class="c-file-input-step file-selection-step">
        <h4 class="file-input-title">
            Label
        </h4>
        <span class="file-input-subtitle">
            Subtitle
        </span>
    </div>

    <!--file selected-->
    <div class="c-file-input-step file-selected-step hidden">
        <h4 class="file-input-title">
            Label
        </h4>
        <span class="file-input-subtitle">
            Subtitle
        </span>
    </div>

    <small class="helper-text"></small>
</c-file-input>
```

## Other components

Components that do not extend `CFormQuestion` but are 'wrapper' components to custom components that do extend `CFormQuestion`

### c-duplicable-form-question

@required

```html

```

### c-fieldset

@required

```html

```

### c-form

@required

```html

```


